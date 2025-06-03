let canvas = new fabric.Canvas('stampCanvas');

function generateStamp() {
    canvas.clear();

    const textAtas = document.getElementById('textAtas').value;
    const textTengah = document.getElementById('textTengah').value;
    const textBawah = document.getElementById('textBawah').value;

    // Buat lingkaran
    const circle = new fabric.Circle({
        radius: 150,
        fill: 'transparent',
        stroke: 'blue',
        strokeWidth: 2,
        left: 200,
        top: 200,
        originX: 'center',
        originY: 'center'
    });

    const innerCircle = new fabric.Circle({
        radius: 145,
        fill: 'transparent',
        stroke: 'blue',
        strokeWidth: 1,
        left: 200,
        top: 200,
        originX: 'center',
        originY: 'center'
    });

    const innerCirclelagi = new fabric.Circle({
        radius: 100,
        fill: 'transparent',
        stroke: 'blue',
        strokeWidth: 1,
        left: 200,
        top: 200,
        originX: 'center',
        originY: 'center'
    });

    // Fungsi untuk membuat teks melengkung
    function createCurvedText(text, radius, startAngle, endAngle, isTop) {
        const chars = text.split('');
        const angleRange = Math.abs(endAngle - startAngle);
        const charAngle = angleRange / chars.length;
        const textObjects = [];
    
        chars.forEach((char, i) => {
            let angle;
            if (isTop) {
                angle = startAngle + (i * charAngle);
            } else {
                // Untuk teks bawah, kita mulai dari sudut akhir
                angle = endAngle - (i * charAngle);
            }
            
            const angleRadians = angle * (Math.PI / 180);
            const x = 200 + radius * Math.cos(angleRadians);
            const y = 200 + radius * Math.sin(angleRadians);
    
            const charObject = new fabric.Text(char, {
                left: x,
                top: y,
                fontSize: 20,
                fill: 'blue',
                originX: 'center',
                originY: 'center',
                // Perbedaan utama ada di sini:
                // Untuk teks bawah, tambahkan 180 derajat agar tidak terbalik
                angle: angle + (isTop ? 90 : 270)
            });
            textObjects.push(charObject);
        });
    
        return textObjects;
    }

    // Teks atas (melengkung atas)
    const textAtasObjects = createCurvedText(textAtas, 122, 
        -175, 
        1, true);

    // Teks bawah (melengkung bawah)
    const textBawahObjects = createCurvedText('★ DINAS KESEHATAN ★', 122, 
        9, 
        160, false);

    // Teks tengah
    const textTengahObj = new fabric.Text(textTengah, {
        left: 200,
        top: 190,
        fontSize: 20,
        fill: 'blue',
        originX: 'center',
        originY: 'center'
    });
    const textDuaObj = new fabric.Text(textBawah, {
        left: 200,
        top: 210,
        fontSize: 20,
        fill: 'blue',
        originX: 'center',
        originY: 'center'
    });

    // Garis horizontal
    const line = new fabric.Line([105, 170, 295, 170], {
        stroke: 'blue',
        strokeWidth: 1
    });
    const linebawah = new fabric.Line([105, 230, 296, 230], {
        stroke: 'blue',
        strokeWidth: 1
    });

    // Tambahkan semua elemen ke canvas
    canvas.add(circle);
    canvas.add(innerCircle);
    canvas.add(innerCirclelagi);
    canvas.add(line);
    canvas.add(linebawah);
    canvas.add(textTengahObj);
    canvas.add(textDuaObj);
    
    textAtasObjects.forEach(obj => canvas.add(obj));
    textBawahObjects.forEach(obj => canvas.add(obj));

    canvas.renderAll();
}

function downloadStamp() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'stempel.png';
    link.href = dataURL;
    link.click();
}

// Generate stempel saat halaman dimuat
window.onload = generateStamp;