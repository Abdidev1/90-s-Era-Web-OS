# 90's Era Web OS

### Description
90's Era Web OS is a web-based project which brings out the charm and nostalgia of Windows Vista back in the early 2000s. You can open programs such as Explorer and Calculator, and there is even a Start button. It's a simple web OS with nothing too complex.

### How it Works
Everything runs client-side in the browser.

* **Opening Apps:** When you click any desktop icon or a program from Start, the code builds a new window box on the screen. To keep the desktop clean, the code checks if the specific app is already open; if it is, it brings that window to the front instead of opening a duplicate.
* **Moving Windows:** When you hover your mouse on the window's title bar and move it, the code tracks where your mouse is going and updates the window position according to the cursor smoothly.
* **The Folder System:** The folder app reads from a simple list of files stored in the code that mirrors a standard folder tree. When you double-click a folder, the screen displays the files inside that specific path.

### What Works and What Doesn't

#### Works:
* **Core Apps:** All apps on the desktop (Computer, Documents, Notepad, and Calculator) can be launched, dragged, minimized, maximized, and closed.
* **Live Clock:** The time displayed in the taskbar automatically updates in real-time.
* **File Explorer Navigation:** The folder system lets you double-click through specific paths (like pictures or music, though it's just for visuals—pictures and music won't actually show up) and can load Notepad files when you double-click them.

#### Doesn't Work:
* **Start-Apps:** Some start apps like desktop will work, but Help & Support, Control Panel, etc., won't work and give no response.
* **Calculator UI:** Although the calculator works fine, the UI is kind of messed up right now.

### Tech Stack
* **HTML5:** Used to build the main skeleton of the desktop, buttons, and windows. The icons are made through SVGs instead of image files.
* **CSS3:** Handles the presentation. Uses gradients, box shadows, and a blur effect (`backdrop-filter`) to create that iconic translucent "glass" look without needing heavy background images.
* **JavaScript (ES6):** The brain of the project. No frameworks were used. It handles all interactive states like making the clock tick, calculating math strings, making windows draggable, etc.

### Motivation
I wanted to build a fun retro desktop project to practice my frontend coding skills from scratch. Instead of using massive external libraries or UI frameworks that do a lot of heavy lifting, I wanted to challenge myself to write everything using raw web languages. It was a great way to learn how web pages handle active mouse movements, custom window layer stacking, and dynamic interface changes when clicked.