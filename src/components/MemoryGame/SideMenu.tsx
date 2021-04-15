import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, withRouter } from 'react-router-dom';
import {
  Drawer,
  Button,
  List,
  ListItem,
  FormGroup,
  Grid,
  IconButton,
  NativeSelect,
  Slider,
  Switch,
  Typography,
} from '@material-ui/core';
import { VolumeUp, Settings } from '@material-ui/icons';
import { initiateGameField } from '../../store/actions/memoryGameActions';
import { WORDBOOK_GROUPS, GAMES, MEMORY } from '../../constants';
import { SELECT_ROUNDS } from '../GameSavannah/constants';
import { IAppState } from '../../store/types';
import useStyles from './styles';
import { changeVolumeSounds } from '../../store/actions/settingsActions';

type Anchor = 'left';

const SideMenu: React.FC = () => {
  const classes = useStyles();
  const [menuState, setMenuState] = React.useState({
    left: false,
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const isCameFromWordbook = location.state?.fromWordbook;

  const activeGroup = useSelector((state: IAppState) => state.wordBook.activeGroup);

  const [wordsCategory, setWordsCategory] = React.useState(
    activeGroup >= 0 ? WORDBOOK_GROUPS[activeGroup].label : WORDBOOK_GROUPS[0].label
  );
  const groupIndex = WORDBOOK_GROUPS.findIndex((el) => wordsCategory === el.label);

  const page: number = Math.floor(Math.random() * SELECT_ROUNDS.amount);
  const actualWords = useSelector((state: IAppState) => state.games.actualWords);
  const [gameMode, setMode] = React.useState('image');
  const gameLevelFromSettings = useSelector((state: IAppState) => state.settings.gameMode);
  const [gameSize, setGameSize] = React.useState(
    GAMES.memory.difficulty[gameLevelFromSettings].value
  );
  const [gameLevelValue, setGameLevelValue] = React.useState(
    GAMES.memory.difficulty[gameLevelFromSettings].label
  );

  const { soundsVolume } = useSelector((state: IAppState) => state.settings);

  const handleChangeGameMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked ? 'image' : 'translation');
  };

  const handleSelectLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    setWordsCategory(value);
  };

  const handleSelectSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    switch (value) {
      case GAMES.memory.difficulty.easy.label: {
        setGameSize(GAMES.memory.difficulty.easy.value);
        setGameLevelValue(GAMES.memory.difficulty.easy.label);
        break;
      }
      case GAMES.memory.difficulty.normal.label: {
        setGameSize(GAMES.memory.difficulty.normal.value);
        setGameLevelValue(GAMES.memory.difficulty.normal.label);
        break;
      }
      case GAMES.memory.difficulty.hard.label: {
        setGameSize(GAMES.memory.difficulty.hard.value);
        setGameLevelValue(GAMES.memory.difficulty.hard.label);
        break;
      }
      default:
        setGameSize(GAMES.memory.difficulty.easy.value);
        setGameLevelValue(GAMES.memory.difficulty.easy.label);
    }
  };

  const renderDropDownMenuOption = (value: string) => {
    return (
      <option value={value} key={value}>
        {value}
      </option>
    );
  };

  const handleVolumeLevelChange = (event: React.ChangeEvent<{}>, value: Number | Array<Number>) => {
    dispatch(changeVolumeSounds(Number(value)));
  };

  const handleMaxVolume = () => {
    dispatch(changeVolumeSounds(MEMORY.gameWordsMaxVolumeLevel));
  };

  useEffect(() => {
    dispatch(
      initiateGameField(gameSize, gameMode, isCameFromWordbook, groupIndex, page, actualWords)
    );
  }, []);

  const handleCloseMenu = (anchor: Anchor, open: boolean) => () => {
    setMenuState({ ...menuState, [anchor]: open });
    dispatch(
      initiateGameField(gameSize, gameMode, isCameFromWordbook, groupIndex, page, actualWords)
    );
  };

  const list = () => (
    <div className={classes.list} role="presentation">
      <List>
        <ListItem key="Раздел учебника">
          <div className={classes.gameMenuLevel}>
            <span className={classes.levelSelectorName}>Раздел учебника:</span>
            <NativeSelect
              id="SelectWordBookGroup"
              onChange={handleSelectLevel}
              disabled={isCameFromWordbook}
              value={wordsCategory}>
              {WORDBOOK_GROUPS.map((el) => renderDropDownMenuOption(el.label))}
            </NativeSelect>
          </div>
        </ListItem>
        <ListItem key="Сложность">
          <div className={classes.gameMenuLevel}>
            <span className={classes.levelSelectorName}>Сложность:</span>
            <NativeSelect
              id="SelectGameLevel"
              onChange={handleSelectSize}
              disabled={false}
              value={gameLevelValue}>
              {Object.values(GAMES.memory.difficulty).map((el) =>
                renderDropDownMenuOption(el.label)
              )}
            </NativeSelect>
          </div>
        </ListItem>
        <ListItem key="Настройки звука">
          <div className={classes.volumeSettings}>
            <span className={classes.levelSelectorName}>Произношение:</span>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  min={MEMORY.gameWordsMinimalVolumeLevel}
                  max={MEMORY.gameWordsMaxVolumeLevel}
                  value={soundsVolume}
                  onChange={handleVolumeLevelChange}
                  aria-labelledby="continuous-slider"
                />
              </Grid>
              <Grid item>
                <IconButton name="volumeUp" onClick={handleMaxVolume} className={classes.btnColor}>
                  <VolumeUp />
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </ListItem>
        <ListItem key="Настройки игры">
          <div className={classes.switcherWrapper}>
            {gameMode === 'translation' && (
              <Typography variant="subtitle1" component="p" className={classes.gameSelect}>
                Перевод
              </Typography>
            )}
            {gameMode === 'image' && (
              <Typography variant="subtitle1" component="p" className={classes.gameSelect}>
                Изображение
              </Typography>
            )}
            <FormGroup>
              <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                  <Grid item>
                    <Switch
                      checked={gameMode === 'image'}
                      onChange={handleChangeGameMode}
                      name="setMode"
                      color="primary"
                      className={classes.switcher}
                    />
                  </Grid>
                </Grid>
              </Typography>
            </FormGroup>
          </div>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key="left">
        <Button onClick={handleCloseMenu('left', true)} className={classes.btnColor}>
          <Settings />
        </Button>
        <Drawer anchor="left" open={menuState.left} onClose={handleCloseMenu('left', false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default withRouter(SideMenu);
