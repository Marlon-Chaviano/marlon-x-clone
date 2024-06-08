import {db} from '.';
import {migrate} from 'drizzle-orm/postgres-js/migrator';

const main = async () => {
    console.log("Migrations running");
    
    await migrate( db ,{ migrationsFolder: "drizzle"})

    
    
}

main()
.then(() => console.log("finished"))
.catch((e) => console.log(e))
.finally(() => process.exit());