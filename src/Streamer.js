import { useState } from "react";

function Streamer(props) {
    const [showGoals, setShowGoals] = useState(false);
    var goals = props.goals;
    var streamer = props.streamer;
    var currentGoal = null;

    goals.forEach(element => {
        if (currentGoal === null && element.reached === false)
        {
            currentGoal = element;
        }
    });

    return <div key={streamer.id} className="streamer">
        <img src={streamer.avatar_url} alt={streamer.display_name} className="avatar"></img>
        <p>{streamer.display_name}</p>
        {currentGoal !== null && 
            <div className="current">
                <p className="currentGoal">Son donation goal actuel</p>
                <p className="currentGoalName">{currentGoal.label}</p>
                <div className="currentGoalBar">
                    <div className="currentGoalProgress" style={{ width: "200px" }}>
                        <div className="currentGoalProgressFill" style={{ width: currentGoal.streamer_total / currentGoal.goal_amount * 200, backgroundColor: "green", height: "20px"}}/>
                    </div>
                    <p className="currentGoalPrice">{currentGoal.streamer_total} € / {currentGoal.goal_amount} €</p>
                </div>
            </div>
        }
        
        <div className="sesDonationsGoals">
            <p>Tous les donations goals de {streamer.display_name}</p>
            <button onClick={(e) => { setShowGoals(!showGoals) }}>+</button>
        </div>
        <ul className="listGoals">
            {showGoals && goals.map((goal) => {
                if (goal.reached)
                {
                    return <li key={goal.id}>
                        <p className="validate">{goal.label}</p>
                        <p className="validate amount">{goal.goal_amount} €</p>
                    </li>
                }
                return <li key={goal.id}>
                        <p className="toValidate">{goal.label}</p>
                        <p className="amount">{goal.goal_amount} €</p>
                </li>
            })}
        </ul>
    </div>
}

export default Streamer;