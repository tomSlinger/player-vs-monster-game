var app = new Vue({
    el:'#app',
    data: {
        gameStarted: false,
        startBtn: true,
        playerHealth: 100,
        playerColor: 'green',
        monsterHealth: 100,
        monsterColor: 'green',
        logs: []
    },
    watch: {
        playerHealth: function(){
            if(this.playerHealth <= 25){
                this.playerColor = "red";
            }else if(this.playerHealth <= 50){
                this.playerColor = "orange";
            }else if(this.playerHealth <= 70){
                this.playerColor = "yellow";
            }else{
                this.playerColor = "green";
            }
        },
        monsterHealth: function(){
            if(this.monsterHealth <= 25){
                this.monsterColor = "red";
            }else if(this.monsterHealth <= 50){
                this.monsterColor = "orange";
            }else if(this.monsterHealth <= 70){
                this.monsterColor = "yellow";
            }else{
                this.monsterColor = "green";
            }
        }
    },
    methods: {
        startNewGame: function(){
            //When we start a new game, we want to completely reset everything...
            this.gameStarted = !this.gameStarted;
            this.startBtn = !this.gameStarted;
            //Reset Player and Monster Health
            this.playerHealth = 100;
            this.monsterHealth = 100;
            //Clear Log
            this.logs = [];
        },
        attackRound: function(){
            //Player Damage - Attack between 1 and 10 dmg.
            var playerDmg = Math.floor((Math.random() * 10) + 1);
            //Do the damage...
            this.monsterHealth -= playerDmg;
            //Push Damage to log
            this.logs.unshift({message: "Player hurt the Monster for " + playerDmg + " damage using a Standard Attack."});

            //Monster Round
            this.monsterRound();

            //Check Victory Status
            this.checkVictoryStatus();
        },
        specialAttackRound: function(){
            //Player Damage - Attack between 5 and 15 dmg.
            var playerDmg = Math.floor((Math.random() * 10) + 5);
            //Do the damage...
            this.monsterHealth -= playerDmg;
            //Push Damage to log
            this.logs.unshift({message: "Player hurt the Monster for " + playerDmg + " damage using a Special Attack."});

            //Monster Round
            this.monsterRound();

            //Check Victory Status
            this.checkVictoryStatus();
        },
        healRound: function(){
            //Player Heal - Between 5 and 15
            var playerHeal = Math.floor((Math.random() * 10) + 5);

            //Check for overhealing
            if(this.playerHealth + playerHeal > 100){
                playerHeal = 100 - this.playerHealth;
                //Apply the Healing
                this.playerHealth += playerHeal;
                //Push Healing to log
                this.logs.unshift({message: "Player healed " + playerHeal + " points of health."});
            }else{
                //Apply the Healing
                this.playerHealth += playerHeal;
                //Push Healing to log
                this.logs.unshift({message: "Player healed " + playerHeal + " points of health."});
            }
            
            //Monster Round
            this.monsterRound();

            //Check Victory Status
            this.checkVictoryStatus();

        },
        giveUp: function(){
            alert("You ran away like a little girl... Try Again?");
            this.startNewGame();
        },
        monsterRound: function(){
            //Monster Damage - Attack between 1 and 15 dmg.
            var monsterDmg = Math.floor((Math.random() * 15) + 1);
            //Do the damage...
            this.playerHealth -= monsterDmg;
            //Push Damage to log
            //this.logs.unshift({message: "Monster hurt the Player for " + monsterDmg + " damage."})
            this.logMessage("Monster hurt the Player for " + monsterDmg + " damage.");
        },
        checkVictoryStatus: function(){
            //Player Won
            if(this.monsterHealth <= 0){
                alert("Congrats, you defeated the monster! Start a new game?");
                this.startNewGame();
            };
            if(this.playerHealth <= 0){
                alert("Oh no! The monsted killed you! Start a new game?");
                this.startNewGame();
            }
        },
        logMessage: function($message){
            this.logs.unshift({
                message: $message
            })
        }
    }
})