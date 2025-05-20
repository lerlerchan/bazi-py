document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('baziForm');
    const resultEl = document.getElementById('result');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const gender = document.getElementById('gender').value;
        const year = parseInt(document.getElementById('year').value, 10);
        const month = parseInt(document.getElementById('month').value, 10);
        const day = parseInt(document.getElementById('day').value, 10);
        const noTime = document.getElementById('noTime').checked;
        let hour = noTime ? 0 : parseInt(document.getElementById('hour').value, 10) || 0;

        // Build solar and lunar objects
        const solar = Lunar.Solar.fromYmdHms(year, month, day, hour, 0, 0);
        const lunar = solar.getLunar();
        const eightChar = lunar.getEightChar();

        // Prepare output
        let output = '';
        output += `Gender: ${gender === 'female' ? 'Female' : 'Male'}\n`;
        output += `Gregorian: ${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}` +
                  (noTime ? ' (time unknown)\n' : ` ${hour.toString().padStart(2,'0')}:00\n`);
        output += `八字 (Eight Characters):\n`;
        output += `  Year : ${eightChar.getYearGan()}${eightChar.getYearZhi()}\n`;
        output += `  Month: ${eightChar.getMonthGan()}${eightChar.getMonthZhi()}\n`;
        output += `  Day   : ${eightChar.getDayGan()}${eightChar.getDayZhi()}\n`;
        output += `  Hour  : ${eightChar.getHourGan()}${eightChar.getHourZhi()}\n\n`;

        output += `Full Interpretation (Ten Gods + Brief Remark):\n`;
        // lunar-js does not provide full ten-god text; show placeholder
        output += `  (Interpretation logic to be implemented)\n`;

        resultEl.textContent = output;
    });
});