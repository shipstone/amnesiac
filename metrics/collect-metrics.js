#!/usr/bin/env node

/**
 * Collect metrics from all amnesiac-adopting projects.
 * 
 * Usage: node collect-metrics.js [--period YYYY-MM]
 * 
 * Reads adopters.json, collects outcomes.jsonl from each project,
 * aggregates metrics, outputs to metrics/YYYY-MM.json
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const METRICS_DIR = path.join(__dirname, '..', 'metrics');
const ADOPTERS_FILE = path.join(METRICS_DIR, 'adopters.json');

async function readJsonl(filepath) {
  const lines = [];
  if (!fs.existsSync(filepath)) return lines;
  
  const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
  });
  
  for await (const line of rl) {
    if (line.trim()) {
      try {
        lines.push(JSON.parse(line));
      } catch (e) {
        console.warn(`Skipping invalid JSON line in ${filepath}`);
      }
    }
  }
  return lines;
}

function filterByPeriod(outcomes, period) {
  if (!period) return outcomes;
  return outcomes.filter(o => o.date && o.date.startsWith(period));
}

function aggregateOutcomes(outcomes) {
  const stats = {
    total: outcomes.length,
    success: 0,
    partial: 0,
    failed: 0,
    stuck: 0,
    patterns: {},
    total_duration_min: 0,
    total_tests_added: 0
  };
  
  for (const o of outcomes) {
    // Count outcomes
    const outcome = (o.outcome || '').toUpperCase();
    if (outcome === 'SUCCESS') stats.success++;
    else if (outcome === 'PARTIAL') stats.partial++;
    else if (outcome === 'FAILED') stats.failed++;
    else if (outcome === 'STUCK') stats.stuck++;
    
    // Count patterns
    if (o.pattern) {
      if (!stats.patterns[o.pattern]) {
        stats.patterns[o.pattern] = { used: 0, success: 0 };
      }
      stats.patterns[o.pattern].used++;
      if (outcome === 'SUCCESS') {
        stats.patterns[o.pattern].success++;
      }
    }
    
    // Sum durations and tests
    if (o.duration_min) stats.total_duration_min += o.duration_min;
    if (o.tests_added) stats.total_tests_added += o.tests_added;
  }
  
  stats.success_rate = stats.total > 0 
    ? Math.round((stats.success / stats.total) * 100) / 100 
    : 0;
  stats.avg_duration_min = stats.total > 0 
    ? Math.round(stats.total_duration_min / stats.total) 
    : 0;
  
  return stats;
}

async function collectFromProject(project) {
  const outcomesPath = path.join(project.local, '.amnesiac', 'outcomes.jsonl');
  const outcomes = await readJsonl(outcomesPath);
  return {
    name: project.name,
    outcomes
  };
}

async function main() {
  // Parse args
  const args = process.argv.slice(2);
  let period = null;
  const periodIdx = args.indexOf('--period');
  if (periodIdx !== -1 && args[periodIdx + 1]) {
    period = args[periodIdx + 1];
  } else {
    // Default to current month
    const now = new Date();
    period = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }
  
  // Read adopters
  if (!fs.existsSync(ADOPTERS_FILE)) {
    console.error('No adopters.json found');
    process.exit(1);
  }
  
  const adopters = JSON.parse(fs.readFileSync(ADOPTERS_FILE, 'utf8'));
  
  if (!adopters.adopters || adopters.adopters.length === 0) {
    console.log('No adopters registered');
    process.exit(0);
  }
  
  // Collect from each project
  const projectMetrics = [];
  let allOutcomes = [];
  
  for (const project of adopters.adopters) {
    console.log(`Collecting from ${project.name}...`);
    const data = await collectFromProject(project);
    const filtered = filterByPeriod(data.outcomes, period);
    const stats = aggregateOutcomes(filtered);
    
    projectMetrics.push({
      project: project.name,
      ...stats
    });
    
    allOutcomes = allOutcomes.concat(filtered);
  }
  
  // Aggregate totals
  const totals = aggregateOutcomes(allOutcomes);
  
  const report = {
    period,
    generated: new Date().toISOString(),
    totals,
    projects: projectMetrics
  };
  
  // Write output
  const outputPath = path.join(METRICS_DIR, `${period}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`\nMetrics written to ${outputPath}`);
  
  // Print summary
  console.log(`\n=== ${period} Summary ===`);
  console.log(`Sessions: ${totals.total}`);
  console.log(`Success rate: ${Math.round(totals.success_rate * 100)}%`);
  console.log(`Avg duration: ${totals.avg_duration_min} min`);
  console.log(`Tests added: ${totals.total_tests_added}`);
}

main().catch(console.error);
