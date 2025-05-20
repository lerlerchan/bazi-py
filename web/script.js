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
        let minute = noTime ? 0 : parseInt(document.getElementById('minute').value, 10) || 0;

        // Build solar and lunar objects
        const solar = Lunar.Solar.fromYmdHms(year, month, day, hour, minute, 0);
        const lunar = solar.getLunar();
        const eightChar = lunar.getEightChar();

        // Prepare output
            // Clear previous result
            resultEl.innerHTML = '';
            // Display header info
            const infoDiv = document.createElement('div');
            infoDiv.innerHTML = `<p>Gender: ${gender === 'female' ? 'Female' : 'Male'}</p>
                <p>Gregorian: ${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}` +
                (noTime
                    ? ' (time unknown)</p>'
                    : ` ${hour.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')}</p>`);
            resultEl.appendChild(infoDiv);
            // Create table
            const table = document.createElement('table');
            const headerRow = table.insertRow();
            ['Pillar', 'Gan', 'Zhi'].forEach(text => {
                const th = document.createElement('th');
                th.textContent = text;
                headerRow.appendChild(th);
            });
            const pillars = [
                { name: 'Year', gan: eightChar.getYearGan(), zhi: eightChar.getYearZhi() },
                { name: 'Month', gan: eightChar.getMonthGan(), zhi: eightChar.getMonthZhi() },
                { name: 'Day', gan: eightChar.getDayGan(), zhi: eightChar.getDayZhi() },
                { name: 'Hour', gan: eightChar.getHourGan(), zhi: eightChar.getHourZhi() }
            ];
            pillars.forEach(({ name, gan, zhi }) => {
                const row = table.insertRow();
                row.insertCell().textContent = name;
                row.insertCell().textContent = gan;
                row.insertCell().textContent = zhi;
            });
            resultEl.appendChild(table);
    });
});