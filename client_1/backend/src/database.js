import fs from "fs";
import { resolve } from "path"

// try {
//     const data = await fs.readFile('db.json', { encoding: 'utf8' });
//     console.log(data);
// } catch (err) {
//     console.log(err);
// }

// async function example() {
//     try {
//         const content = 'Some content!';
//         await fs.writeFile('db.json', content);
//     } catch (err) {
//         console.log(err);
//     }
// }
// example();

const initDatabase = {
    AccountTable: {
        index: 1000000,
        data: []
    },
    PostTable: {
        index: 1000000,
        data: []
    },
    FollowTable: {
        index: 1000000,
        data: []
    },
    LikeTable: {
        index: 1000000,
        data: []
    }
}

/**@type {import("./type").loadDatabase} */
const load = () => {
    try {
        const data = fs.readFileSync(resolve('./db.json'), { encoding: 'utf8' });
        return JSON.parse(data);
    } catch (err) {
        return initDatabase;
    }
}

const save = (data) => {
    try {
        fs.writeFileSync(resolve('./db.json'), JSON.stringify(data, null, 4), { encoding: "utf8" });
    } catch (e) { }
}

const database = {
    load,
    save
}

export default database