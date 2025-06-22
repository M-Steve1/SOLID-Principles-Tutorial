// ❌ Bad (violates OCP):

function calculateOne (expenseType: string, income: number): number {
    if (expenseType === "tithe") return income * 0.1;
    if(expenseType === "game") return income * 0.3;
    return income;
}

// Note: To add a new expenseType the function must change and that violates OCP

//✅ Good (OCP-compliant):

type SpendingRule = (income: number) => number;

const spendingStrategy: Record<string, SpendingRule> = {
    tithe: income => income * 0.1,
    game: income => income * 0.3,
    clothing: income => income * 0.4,
}

function calculate(expenseType: string, income: number): number {
    const rule = spendingStrategy[expenseType.toLowerCase()];
    return rule ? rule(income) : income;
}

// Note: Now you can add new expenseType without changing the core logic/function.
// lets add a new expenseType called 'clothing'.




