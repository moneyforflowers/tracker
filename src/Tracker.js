import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetGoalsStreamer } from "./Services/GetGoalsStreamer";
import Carousel from 'react-bootstrap/Carousel';
import { GetStreamer } from "./Services/GetStreamer";
import NumberFlow from '@number-flow/react'

function Tracker() {
    let params = useParams();
    const [goalsCurrent, setGoalsCurrent] = useState([]);
    const [streamerData, setStreamerData] = useState(null);
    const [currentGoal, setCurrentGoal] = useState(null);
    const [currentAmount, setCurrentAmount] = useState(0);

    useEffect(function() {
        GetStreamer(params.pseudo).then((data => {
            if (data.length > 0)
            {
                setStreamerData(data[0]);
            }
        }));
    }, [params.pseudo]);

    useEffect(function () {


        GetGoalsStreamer(params.pseudo).then((data) => {
                setGoalsCurrent(data)


                let currentNew = null;
                if (data.length > 0)
                {
                    setCurrentAmount(data[0].streamer_total)
                }
                data.forEach((element) => {

                    if (currentNew === null && element.reached === false)
                    {
                        currentNew = element;
                        if (currentGoal === null)
                        {
                            setCurrentGoal(currentNew);
                        }
                        else if (currentGoal.id !== currentNew.id) {
                            // New Goal !
                        }
                    }
                });
            });


        let timer = setInterval(() => {
            GetGoalsStreamer(params.pseudo).then((data) => {
                    setGoalsCurrent(data)

                    let currentNew = null;
                    if (data.length > 0)
                    {
                        setCurrentAmount(data[0].streamer_total)
                    }
                    data.forEach((element) => {

                        if (currentNew === null && element.reached === false)
                        {
                            currentNew = element;
                            if (currentGoal === null)
                            {
                                setCurrentGoal(currentNew);
                            }
                            else if (currentGoal.id !== currentNew.id) {
                                // New Goal !
                            }
                        }
                    });

                    
                });
        }, 10000);

        return () => {
            clearInterval(timer);
        }
    }, [params.pseudo]);


    return <div className="tracker">
        <Carousel  wrap={true} indicators={false} controls={false} interval={5000}>
            <Carousel.Item>
                {currentGoal != null && <div className="trackerGoal">
                    <p className="trackerGoalLabel">{currentGoal.label}</p>
                    <div className="currentGoalBar">
                        <div className="currentGoalProgress" style={{ width: "300px" }}>
                            <div className="currentGoalProgressFill" style={{ width: currentGoal.streamer_total / currentGoal.goal_amount * 300, backgroundColor: "#e800a8", height: "25px"}}/>
                        </div>
                        <p className="currentGoalPrice"><NumberFlow value={currentGoal.streamer_total}/> € / {currentGoal.goal_amount} €</p>
                    </div>
                </div>}
            </Carousel.Item>
            <Carousel.Item>
                {streamerData != null && <div className="trackerStreamer">
                    <img src={streamerData.avatar_url} alt={streamerData.display_name} className="avatar"></img>
                    <p className="trackerStreamerName">{streamerData.display_name}</p>
                    <p className="trackerStreamerAmount"><NumberFlow value={currentAmount}/> €</p>
                </div>}
            </Carousel.Item>
        </Carousel>
    </div>;
}

export default Tracker;