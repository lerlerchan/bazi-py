document.getElementById('calculate').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const date = new Date(document.getElementById('date').value);
    
    if (!name || !date) {
        alert('请填写所有字段');
        return;
    }
    
    // Simple Bazi logic (placeholder)
    const result = `姓名: ${name}, 性别: ${gender}, 出生日期: ${date.toLocaleDateString()}`;
    
    document.getElementById('result').innerText = result;
});

// Bazi calculation logic
function calculateBazi(date) {
    const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const day = date.getDate();

    // Calculate the Heavenly Stem and Earthly Branch for year, month, day
    const yearStem = heavenlyStems[(year - 4) % 10];
    const yearBranch = earthlyBranches[(year - 4) % 12];
    
    const monthStem = heavenlyStems[(year * 12 + month) % 10];
    const monthBranch = earthlyBranches[(month + 1) % 12];

    const dayStem = heavenlyStems[(year * 365 + month * 30 + day) % 10];
    const dayBranch = earthlyBranches[(day + 1) % 12];

    return `${yearStem}${yearBranch} ${monthStem}${monthBranch} ${dayStem}${dayBranch}`;
}

// Placeholder for PDF saving functionality
document.getElementById('save').addEventListener('click', function() {
    alert('保存为PDF功能尚未实现');
});
