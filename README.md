# 90-s-Era-Web-OS
Description:

90's Era Web OS is a web based project which brings out the charm and nostalgia of windows vista back in early 2000's, you can open programs such as explorer,calculator, there is even a start button, etc. its a simple web OS with nothing too much complex.

How it Works:

Everything runs on client-side on browser

Opening Apps: when you click any desktop icon or a program from start, the code builds a new window box on the screen, to keep the desktop clean the code checks if the specific app is already open, if it is then it brings that window to front instead of opening 2 same apps.

Moving Windows: When you hover your mouse on the window's title bar and move it, the code tracks where your mouse is going and update's the window position according to the cursor smoothly.

The folder system: the folder app reads from a simple list of files stored in the code that mirrors a standard folder tree. when you double click folder, the screen displays the files inside the new specific path.

What works and what doesnt:

Works:

core apps: all apps on the desktop (Computer,documents,notepad, and calculator) can be launched, dragged, minmized, maximized and closed.

live Clock: the time displays in the taskbar automatically updates in realtime.

file explorer navigation: the folder system lets you double click through specific paths (like pictures or music but its just for visuals pictures and music wont show up) and can load note pad files when you double click them

Doesnt Work:

Start-Apps: some start apps like desktop will work but help & support, control panel, etc wont work and give no response

calculator Ui: altough the calculator works fine but the Ui Is kind of messed up right now

Tech Stack:

HTML5: used to build the main skeleton of desktop,button and windows. the icons are made thorugh SVGs instead of image files.

CSS3: handles the presentation. uses gradiesnts,box shadows, and blur effect (backdrop-filter) to create that iconic translucent 'glass' look without needing heavy background images

Javascript ES6: the brain of project, no frameworks were used, it handles all interactive stats like making the clock tick,calculating maths strings, making windows draggable, etc.

Motivation: i wanted to build fun retro desktop project to practice my frontend coding skills from scratch. instead of using massive external libraries or Ui Framworks (like rust) that do a lot of heavy lifting, i wanted to challange myself to write everything using raw web languages. it was a great way to learn how web pages handle active mouse movements, custom
window layer stacking, and dynamic interface changes when clicked.
