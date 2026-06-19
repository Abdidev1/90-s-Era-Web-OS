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
            title : 'Documents',
            width: 520,
            height: 360,
            type: "explorer"
        },
        calc: {
            title: "Calculator",
            width: 240,
            height: 310,
            type: 'html',
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
            focusWindow(entry.winEl, entry.tabEl);
            if (appKey === 'explorer') {
                showFolder(entry.winEl, folder);
            }
            return;
        }
        
        const cfg = apps[appKey];
        if (!cfg) return;

        const windID = 'win-' + Math.random().toString(36).substr(2, 9);
        const winEl = document.createElement('div');
        winEl.className = 'window';
        winEl.id = windID;
        winEl.style.width = cfg.width + 'px';
        winEl.style.height = cfg.height + 'px';

        winEl.innerHTML = `
        <div class="title-bar">
            <span class="title-text">${cfg.title}</span>
            <div class="title-controls">
                <button class="min-btn">_</button>
                <button class="max-btn">[]</button>
                <button class="close-btn">X</button>
            </div>
        </div>
        <div class="window-body"></div>
        `;

        const body = winEl.querySelector('.window-body');

        if (cfg.type === 'html') {
            body.innerHTML = cfg.data;
        } else if (cfg.type === 'explorer') {
            body.innerHTML = `<div class="explorer-container">
                                   <div class="explorer-sidebar"></div>
                                   <div class="explorer-main"></div>
                               </div>`;
            buildExplorer(winEl, folder);
        }

        desktop.appendChild(winEl);

        const tab = addTaskbarTab(windID, cfg.title);
        openWindows[appKey] = { winEl, tabEl: tab};

        wireWindowControls(winEl, tab, appKey);
        focusWindow(winEl, tab);

        if (appKey === 'calc') bindCalc(winEl);
    }

    function focusWindow(winEl, tabEl) {
        document.querySelectorAll('.window').forEach(w => w.classList.add("inactive"));
        document.querySelectorAll('.task-tab').forEach(t => t.classList.remove('active'));
        winEl.classList.remove('inactive');
        topZ += 2;
        winEl.style.zIndex = topZ;
        if (tabEl) tabEl.classList.add('active');
    }

    function addTaskbarTab(windID, title) {
        const tab = document.createElement('div');
        tab.className = 'task-tab';
        tab.id = 'tab-' + windID;
        tab.textContent = title;
        taskbarApps.appendChild(tab);
        return tab;
    }

    function wireWindowControls(winEl, tab, appKey) {
        const titleBar = winEl.querySelector('.title-bar');

        winEl.addEventListener('mousedown', () => focusWindow(winEl, tab));

        tab.addEventListener('click', () => {
            if (winEl.style.display === 'none') {
                winEl.style.display = 'flex';
                focusWindow(winEl, tab);
            } else if (!winEl.classList.contains('inactive')) {
                winEl.style.display = 'none';
            } else {
                focusWindow(winEl, tab);
            }
        });

        winEl.querySelector('.min-btn').addEventListener('click', function (e){
            e.stopPropagation();
            winEl.style.display = 'none';
        });

        winEl.querySelector('.max-btn').addEventListener('click', function (e){
            e.stopPropagation();
            if (maximized[winEl.id]) {
                winEl.classList.remove('maximized');
                maximized[winEl.id] = false
            } else {
                winEl.classList.add('maximized');
                maximized[winEl.id] = true
            }
        });
        
        winEl.querySelector('.close-btn').addEventListener('click', function (e) {
            e.stopPropagation();
            winEl.remove();
            tab.remove();
            delete openWindows[appKey];
            delete maximized[winEl.id];
        });

        let dragging = false;
        let startX, startY, originLeft, originTop;

        titleBar.addEventListener('mousedown', function (e) {
            if (e.target.tagName === 'BUTTON' || maximized[winEl.id]) return;
            dragging = true;
            startX = e.clientX;
            startY = e.clientY;
            originLeft = parseInt(winEl.style.left, 10) || 0;
            originTop = parseInt(winEl.style.top, 10) || 0;
            focusWindow(winEl, tab);
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', onDragEnd);
        });

        function onDrag(e) {
            if (!dragging) return;
            winEl.style.left =  (originLeft + (e.clientX - startX)) + 'px';
            winEl.style.top =   (originTop + (e.clientY - startY)) + 'px';
        }

        function onDragEnd() {
            dragging = false
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', onDragEnd);
        }
    }

    function buildExplorer(winEl, startFolder) {
        const sidebar = winEl.querySelector('.explorer-sidebar');
        const folders = ['root','documents','pictures','music'];

        folders.forEach(function (key) {
            const label = key === 'root'
                ? 'Personal Folder'
                :key.charAt(0).toUpperCase() + key.slice(1);
            
                const link = document.createElement('div');
                link.className = 'sidebar-link';
                link.textContent = label;
                link.setAttribute('data-target', key);

                link.addEventListener('click', function () {
                    sidebar.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    showFolder(winEl, key);
                });

                sidebar.appendChild(link);
        });

        showFolder(winEl, startFolder);     
    }
    
    function showFolder(winEl, folderKey) {
        const main = winEl.querySelector('.explorer-main');
        const sidebar = winEl.querySelector('.explorer-sidebar');
        main.innerHTML = '';

        const activeLink = sidebar.querySelector('[data-target="' + folderKey + '"]');
        if (activeLink) {
            sidebar.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
        }

        const items = fileSystem[folderKey] || [];

        items.forEach(function (item) {
            const entry = document.createElement('div');
            entry.className = 'file-item';

            let color = '#3a82e6';
            if (item.type === 'folder') color = '#f5c043';
            if (item.type === 'image') color = '#8fa93c';

            entry.innerHTML = `
                <div class="file-icon">
                    <svg viewBox="0 0 32 32" width="100%" height="100%">
                        <rect x="4" y="6" width="24" height="20" rx="2" fill="${color}"/>
                    </svg>
                </div>
                <div class="file-name">${item.name}</div>
            `;

            entry.addEventListener('dblclick', function () {
                if (item.type === 'folder') {
                    showFolder(winEl, item.target);
                } else if (item.type === 'file') {
                    launchApp('notepad');

                    setTimeout(function () {
                        var np = openWindows['notepad'];
                        if (np) {
                            np.winEl.querySelector('.notepad-textarea').value = item.content;
                        }
                    }, 80);
                }
            });

            main.appendChild(entry);
        });
    }

    function bindCalc(winEl) {
        const display = winEl.querySelector('#calc-screen');
        let expr = '';

        let isResultDisplayed = false;

        winEl.querySelectorAll('.calc-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const val = btn.textContent;

                if (val === 'C') {
                    expr = '';
                    display.value = '0';

                    isResultDisplayed = false;
                } else if (val === '=') {
                    try {
                        if (expr) {
                            const result = new Function('return ' + expr)();
                            display.value = result;
                            expr = String(result);

                            isResultDisplayed = true;
                        }
                    } catch (err) {
                        display.value = 'Error';
                        expr = '';

                        isResultDisplayed = false;
                    }
                } else {

                    if (isResultDisplayed) {
                        if (!isNaN(val)) {
                            expr = val;
                        } else {
                            expr+= val;
                        }
                        isResultDisplayed = false;
                    } else {
                        if (display.value === '0' && !isNaN(val)) {
                            expr = val;
                        } else {
                            expr += val;
                        }
                    }
                    display.value = expr;
                }
            });
        });
    }

        document.addEventListener('DOMContentLoaded', function (){
            initClock();

            startButton.addEventListener('click', function(e) {
                e.stopPropagation();
                startMenu.classList.toggle('open');
            });

            document.addEventListener('click', function () {
                startMenu.classList.remove('open');
            });

            startMenu.addEventListener('click', function(e) {
                e.stopPropagation();
            });

            document.querySelectorAll('.shortcut').forEach(function (el) {
                el.addEventListener('click', function () {
                    launchApp(el.getAttribute('data-app'));
                });
            });

            document.querySelectorAll('.menu-item[data-app]').forEach(function (el){
                el.addEventListener('click', function () {
                    launchApp(el.getAttribute('data-app'));
                });
            });

            document.querySelectorAll('.right-link-item[data-folder]').forEach(function (el) {
                el.addEventListener('click', function () {
                    launchApp('explorer', el.getAttribute('data-folder'));
                });
            });
        });

})();