
let battles_data = []
let agg_object={}
let div = document.getElementById('#agg_data')


async function handleSubmitQ1(){
    await fetchJson()
}


function fetchJson() {
   fetch("battles.json")
        .then(response => response.json())
        .then(json => {
            battles_data = json
        })
        .then(()=>{
            agg_object["attacker_outcome"]=getAttackerOutcome()
            agg_object["battle_type"]=Array.from(getUniqueBattleTypes())
            agg_object["defender_size"]=getDefenderSize()
            agg_object["most_active"]=getMostActive()
            // console.log(agg_object)
            showAggData(agg_object)
        })
        .catch(err=>{
            console.log(err)
        })
}


function getMostActive(){
 
    function getMaxKey(obj){
        let keys = Object.keys(obj)
        let vals = Object.values(obj)
        let maxval = Math.max(...vals)
        let maxindex = vals.indexOf(maxval)
        return keys[maxindex]
    }
 
    let attacker_kings={}
    battles_data.map(battle=>{
        if(battle.attacker_king!==""){
            if(Object.keys(attacker_kings).includes(battle.attacker_king)){
                attacker_kings[battle.attacker_king] = attacker_kings[battle.attacker_king]+1
            }else{
                attacker_kings[battle.attacker_king] = 1
            }
        }
    })

    let defender_kings={}
    battles_data.map(battle=>{
        if(battle.defender_king!==""){
            if(Object.keys(defender_kings).includes(battle.defender_king)){
                defender_kings[battle.defender_king] = defender_kings[battle.defender_king]+1
            }else{
                defender_kings[battle.defender_king] = 1
            }
        }
    })

    let regions={}
    battles_data.map(battle=>{
        if(battle.region!==""){
            if(Object.keys(regions).includes(battle.region)){
                regions[battle.region] = regions[battle.region]+1
            }else{
                regions[battle.region] = 1
            }
        }
    })
    
    return {
        "attacker_king":getMaxKey(attacker_kings),
        "defender_king":getMaxKey(defender_kings),
        "region":getMaxKey(regions)
    }
}

function getAttackerOutcome(){
    let win=0
    let loss=0
    battles_data.map(battle=>{
        if(battle.attacker_outcome==="win"){win+=1}
        else{loss+=1}
    })
    return {win:win,loss:loss}
}

function getUniqueBattleTypes(){
    let all_battles=[]
    battles_data.map(battle=>{
        if(battle.battle_type!==""){
            all_battles.push(battle.battle_type)
        }
    })
    return new Set(all_battles)
}

function getDefenderSize(){
    function getmax(a,b){
        if(typeof a.defender_size === 'null'){return b}
        if(typeof b.defender_size === 'null'){return a}
        if(a.defender_size>b.defender_size){return a}
        else{return b}
    }
    function getmin(battles){
        let min = 1000000000
        battles.map(battle=>{
            if(battle.defender_size!=null){
                if(battle.defender_size<min){
                    min = battle.defender_size
                }
            }
            
        })
        return min
    }
    
    let mini = getmin(battles_data)
    let max = battles_data.reduce(getmax).defender_size
    let sum = 0
    battles_data.map((elem)=>{
        sum+=elem.defender_size
    })
    let avg = sum/battles_data.length
    
    return {
        min:mini,
        max:max,
        avg:avg
    }
}

function showAggData(agg_object){
    console.log(agg_object)
    $('#agg_data').append(`<pre>${agg_object}</pre>`)
}