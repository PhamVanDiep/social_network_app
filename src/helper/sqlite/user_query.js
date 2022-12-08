import { localDatabase } from "./config";

ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    localDatabase.transaction((trans) => {
        trans.executeSql(sql, params, (trans, results) => {
            resolve(results);
        },
            (error) => {
                reject(error);
            });
    });
});

export async function CreateTable() {
    let query = "CREATE TABLE IF NOT EXISTS users "
        + "(_id INTEGER PRIMARY KEY NOT NULL, "
        + "phonenumber VARCHAR(20), "
        + "username VARCHAR(100), "
        + "password VARCHAR(255), "
        + "token TEXT, "
        + "last_access VARCHAR(50)"
        + ")"
    let exec = await this.ExecuteQuery(query, []);
    console.log(exec);
}

export async function getAllUsers() {
    let query = "SELECT * FROM users";
    let exec = await this.ExecuteQuery(query, []);
    let rows = exec.rows;
    for (let i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        console.log(item);
    }
}

export async function insertUser(user) {
    let query = "INSERT INTO users (_id, phonenumber, username, password, token, last_access) VALUES (?, ?, ?, ?, ?, ?)";
    let exec = await this.ExecuteQuery(query, user);
    console.log(exec);
}

export async function updateUser(data) {
    let query = "UPDATE users SET phonenumber = ?, username = ?, password = ?, token = ?, last_access = ? WHERE _id = ?";
    let exec = await this.ExecuteQuery(query, data);
    console.log(exec);
}

export async function deleteUser(user_id) {
    let query = "DELETE FROM users WHERE _id = ?";
    let exec = await this.ExecuteQuery(query, user_id);
    console.log(exec);
}

export async function getUserById(user_id) {
    let query = "SELECT * FROM users WHERE _id = ?";
    let exec = await this.ExecuteQuery(query, user_id);
    console.log(exec.rows.item(0));
}