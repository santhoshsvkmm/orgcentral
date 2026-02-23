const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(file => {
            const filepath = path.join(dir, file);
            if (fs.statSync(filepath).isDirectory()) {
                filelist = walkSync(filepath, filelist);
            } else {
                filelist.push(filepath);
            }
        });
    }
    return filelist;
}

const targetDir = path.resolve(__dirname, 'src/app/projects/[id]');
const files = walkSync(targetDir).filter(f => f.endsWith('.tsx'));

const globalLayoutPath = path.resolve(targetDir, 'layout.tsx');

let count = 0;
files.forEach(file => {
    // skip the new global layout
    if (file === globalLayoutPath) return;

    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    if (content.includes('ProjectMenubar')) {
        // Remove import
        content = content.replace(/import\s*\{\s*ProjectMenubar\s*\}\s*from\s*['"]@\/components\/projects\/project-menubar['"];?\r?\n?/g, '');

        // Remove component usage - could have props and be on multiple lines. Match single line mostly.
        content = content.replace(/<ProjectMenubar[^>]+>\s*<\/ProjectMenubar>|<ProjectMenubar[^>]+\/>\r?\n?/gi, '');

        if (content !== original) {
            fs.writeFileSync(file, content, 'utf8');
            console.log('Fixed ' + file);
            count++;
        }
    }
});

console.log('Total files fixed: ' + count);
