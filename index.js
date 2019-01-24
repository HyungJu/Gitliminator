const colors = require('colors');
const readline = require('readline');
const request = require('request');

const api = "https://api.github.com";


console.log("Gitliminator".red);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please input your '+'Personal Access Token'.red+" : ", (token) => {

   git

    console.log("Fetching your repos...".green);
    console.log("");
    request(
        {
            url : api+"/user/repos",
            headers : {
                "Authorization" : "token "+token,
                "User-Agent": "Gitliminator"
            }
        },
        function (error, response, body) {
            const repo_list = JSON.parse(body)
            console.log("Fetch Completed".red);
            let i=0;
            repo_list.forEach(function(entry){
                i++;
               console.log((i+"").blue+".".blue+entry.full_name.green)
            });
            console.log("");

            rl.question("Select repo that you want to remove.(Use comma to input multiple repos)\n".red, (msg)=>{

                msg.split(",").forEach((entry)=>{
                    request(
                        {
                            method: "DELETE",
                            url : api+"/repos/"+repo_list[entry-1].full_name,
                            headers : {
                                "Authorization" : "token "+token,
                                "User-Agent": "Gitliminator"
                            }
                        },function(error,response,body){
                            if(body == ''){
                                console.log(("Removed "+repo_list[entry-1].full_name+".").red)
                            }

                        }
                    )



                })




            });
        }
    );

})