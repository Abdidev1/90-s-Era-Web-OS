(function (){
    const fileSystem = {
        root : [
            { name:"Documents", type:"folder", target: "documents"},
            { name: "Pictures", type:"folder", target: "pictures"},
            { name: "Music", type: "folder", target: "music"}
        ],
        documents: [
            { name: "Notes.txt", type:"file", content:"Notepad text data"},
            { name: "ProjectInfo.txt", type:"file", content: "90's Era Web OS configuration file."}
        ],
        pictures: [
            { name: "DesktopBackground.jpg", type: "image"},
            { name: "Wallpaper.jpg", type: "image"}
        ],
        music: [
            {name: "Waka Waka.mp3", type: "audio"}
        ]
    };
    
    const apps = {
        computer: {
            title: "Computer",
            width: 440,
            height: 300,
            type: "html",
            data: `<div style="padding:5px;color:#333;">
                       <p style="font-weight:600;margin-bottom:10px;">Hard Disk Drives (1)</p>
                       <div style="padding:12px;border:1px solid #ccc;border-radius:4px;display:flex;align-items:center;gap:10px;width:160px;">
                           <div style="width:24px;height:16px;background:#999;border-radius:2px;"></div>
                           <div><strong>Local Disk (C:)</strong><br><small style="color:#777;">98.2 GB free</small></div>
                       </div>
                   </div>`
        },
        notepad: {
            title: "Untitled - Notepad",
            width: 480,
            height: 340,
            type: "html",
            data: '<textarea class="notepad-textarea" placeholder="Start typing..."></textarea>'
        },
        explorer: {
            title: "Documents",
            width: "520",
            height: "360",
            type: "html",
            data: `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">
                       <input type="text" id="calc-screen" readonly
                           style="grid-column:span 4;text-align:right;padding:8px;margin-bottom:10px;
                                  border:1px solid #bbb;font-size:18px;outline:none;background:#fff;color:#000;" value="0">
                       <button class="calc-btn" style="padding:10px;">C</button>
                       <button class="calc-btn" style="padding:10px;">/</button>
                       <button class="calc-btn" style="padding:10px;">*</button>
                       <button class="calc-btn" style="padding:10px;">-</button>
                       <button class="calc-btn" style="padding:10px;">7</button>
                       <button class="calc-btn" style="padding:10px;">8</button>
                       <button class="calc-btn" style="padding:10px;">9</button>
                       <button class="calc-btn" style="padding:10px;grid-row:span 2;height:100%;">+</button>
                       <button class="calc-btn" style="padding:10px;">4</button>
                       <button class="calc-btn" style="padding:10px;">5</button>
                       <button class="calc-btn" style="padding:10px;">6</button>
                       <button class="calc-btn" style="padding:10px;">1</button>
                       <button class="calc-btn" style="padding:10px;">2</button>
                       <button class="calc-btn" style="padding:10px;">3</button>
                       <button class="calc-btn" style="padding:10px;grid-column:span 2;">=</button>
                       <button class="calc-btn" style="padding:10px;grid-column:span 2;">0</button>
                   </div>`
        }
    };

    let topZ = 2000;
    const openWindows = {};
    const maximized = {};

    const desktop = document.getElementById('desktop');
    const taskbarApps = document.getElementById('taskbarApps');
    const startMenu = document.getElementById('startMenu');
    const startButton = document.getElementById('startButton');

    function initClock() {
        const clockEl = document.getElementById('clock');
        function tick() {
            const now = new Date();
            let hours = now.getHours();
            const mins = String(now.getMinutes()).padStart(2, '0');
            const period = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            clockEl.textContent = `${hours}:${mins} ${period}`;
        }
        setInterval(tick, 1000);
        tick();
    }

    function launchApp(appKey, folder) {
        folder = folder || 'root';
        startMenu.classList.remove('open');

        if (openWindows[appKey]) {
            const entry = openWindows[appKey];
            if (entry.winEl.style.display === 'none') {
                entry.winEl.style.display = 'flex';
            }
            focusWindow(entry,winEl, entry.tabEl);
            if (appKey === 'explorer') {
                showFolder(entry.winEl, folder);
            }
            return;
        }
        
        const cfg = apps[appKey];
        if (!cfg) return;

    }
})
