import { execSync } from 'child_process';

const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    cyan: "\x1b[36m",
    blue: "\x1b[34m",
    green: "\x1b[32m",
    red: "\x1b[31m"
};

console.log(`${colors.bright}${colors.cyan}\n` + '='.repeat(60));
console.log('🚀 CLINICAL CASE SIMULATOR - PRODUCTION AUDIT'.padStart(52));
console.log('='.repeat(60) + `\n${colors.reset}`);

const runStep = (name, command) => {
    console.log(`${colors.bright}${colors.blue}🔄 Rodando: ${name}...${colors.reset}`);
    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`${colors.green}✅ ${name}: PASSOU\n${colors.reset}`);
        return true;
    } catch {
        console.log(`${colors.red}❌ ${name}: FALHOU\n${colors.reset}`);
        return false;
    }
};

const steps = [
    { name: 'Segurança (npm audit)', cmd: 'npm audit --audit-level=high' },
    { name: 'Linting (ESLint)', cmd: 'npm run lint' },
    { name: 'Tipagem (TypeScript)', cmd: 'npx tsc --noEmit' },
    { name: 'Build de Produção', cmd: 'npm run build' }
];

let allPassed = true;
for (const step of steps) {
    if (!runStep(step.name, step.cmd)) {
        allPassed = false;
        break;
    }
}

if (allPassed) {
    console.log(`${colors.bright}${colors.green}✨ TODAS AS VERIFICAÇÕES PASSARAM! O PROJETO ESTÁ PRONTO PARA DEPLOY. ✨\n${colors.reset}`);
    process.exit(0);
} else {
    console.log(`${colors.bright}${colors.red}🛑 AUDITORIA FALHOU. Corrija os erros antes de fazer o deploy. 🛑\n${colors.reset}`);
    process.exit(1);
}
