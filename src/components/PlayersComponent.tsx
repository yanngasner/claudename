import React, {FC} from 'react';
import {GameModel, PlayerModel} from "../types/gameTypes";
import {RoundStatus, Team} from "../types/enums";
import {BlueButton, RedButton} from "./MaterialComponents";
import {makeStyles} from "@material-ui/core/styles";
import './PlayersComponent.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

interface PlayersComponentProps {
    game: GameModel,
    player: PlayerModel | undefined,
    joinTeam: (team: Team) => void,
}

const PlayersComponent: FC<PlayersComponentProps> = ({game, player, joinTeam}) => {

    const classes = useStyles();

    const currentRound = game.rounds[game.roundId];
    const isBlue = player?.team === Team.Blue;
    const isRed = player?.team === Team.Red;
    const isBlueLeader = player !== undefined && player.userId === currentRound.blueLeaderId;
    const isRedLeader = player !== undefined && player.userId === currentRound.redLeaderId;
    const isLeader = isBlueLeader || isRedLeader;

    const handleJoinClick = (team: Team) => joinTeam(team);


    return <div className={'players-component'}>
        <div className={'players-list-component'}>
            {game.players.filter(p => p.team === Team.Blue).map(p =>
                <div
                    className={`${isLeader ? 'leader-player' : ''}`}
                    key={p.userName}>
                    <p>{p.userName}</p>
                </div>)
            }
        </div>
        <div className={`${classes.root}`}>
                <BlueButton disabled={isBlue || isRedLeader} onClick={() => handleJoinClick(Team.Blue)}>Team Bleu</BlueButton>
                <RedButton disabled={isRed || isBlueLeader} onClick={() => handleJoinClick(Team.Red)}>Team Rouge</RedButton>
        </div>
        <div className={'players-list-component'}>
            {game.players.filter(p => p.team === Team.Red).map(p =>
                <div
                    className={`${isLeader ? 'leader-player' : ''}`}
                    key={p.userName}>
                    <p>{p.userName}</p>
                </div>)
            }
        </div>
    </div>
}

export default PlayersComponent;
