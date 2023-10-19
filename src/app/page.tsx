import { promises as fs } from 'fs';
import Graph from "@/components/graph";
import styles from "./page.module.css"

export default async function Page() {
    const fileBuffer = await fs.readFile(process.cwd() + '/public/json/JSON.json');
    const fileContents = fileBuffer.toString();
    const data = JSON.parse(fileContents);

    return (
        <div className={styles.wrapper}>
            <Graph data={data}/>
        </div>
    );
};
