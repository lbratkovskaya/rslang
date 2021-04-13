import React, { useEffect, useState } from 'react';
import Chart, { ChartOptions } from 'chart.js';
import { Bar, ChartData, defaults } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import Header from '../Header';
import Footer from '../Footer';
import { fetchStatistics } from '../../store/actions/statisticsActions';
import { IAppState, IGameName, IGameStatistics } from '../../store/types';
import { GAMES } from '../../constants';
import useStyles from './styles';

interface IStatsGameResult {
  id: string;
  gameTitle: string;
  dailyLearned: number;
  correctPercent: number;
  correctSeries: number;
  wordsTotal: number;
  correctTotal: number;
}

interface IStatsDaily {
  id: string;
  backgroundColor: string;
  sectionTitle: string;
  data: { [key: string]: number };
}

interface IStatsDailyResult {
  dailyLearned: IStatsDaily;
  learningProgress: IStatsDaily;
}

const Statistics: React.FC = () => {
  const statistics = useSelector((state: IAppState) => state.statistics.statistics);
  const userData = useSelector((state: IAppState) => state.user.data);
  const isLoggedIn = useSelector((state: IAppState) => state.user.isLoggedIn);

  const [lastDayLearned, setLastDayLearned] = useState(0);
  const [correctPercent, setCorrectPercent] = useState(0);
  const [lastDateStr, setLastDateStr] = useState('');
  const [savannahResult, setSavannahResult] = useState({} as IStatsGameResult);
  const [audioResult, setAudioResult] = useState({} as IStatsGameResult);
  const [sprintResult, setSprintResult] = useState({} as IStatsGameResult);
  const [memoryResult, setMemoryResult] = useState({} as IStatsGameResult);
  const [dailyResult, setDailyResult] = useState({} as IStatsDailyResult);
  const [statsLoaded, setStatsLoaded] = useState(false);

  const dispatch = useDispatch();

  const styles = useStyles();

  const fillGameResultWithStats = (resultObj: IStatsGameResult, stat: IGameStatistics): void => {
    const res = {
      dailyLearned: resultObj.dailyLearned + stat.wordsLearned,
      wordsTotal: resultObj.wordsTotal + stat.wordsTotal,
      correctTotal: resultObj.correctTotal + stat.correctTotal,
      correctSeries: Math.max(stat.correctSeries, resultObj.correctSeries || 0),
    };
    Object.assign(resultObj, res);
  };

  const calcCorrectPercent = (resultObj: IStatsGameResult): void => {
    const res = {
      correctPercent:
        resultObj.wordsTotal === 0
          ? 0
          : Math.round((resultObj.correctTotal / resultObj.wordsTotal) * 100),
    };
    Object.assign(resultObj, res);
  };

  const renderGamesTables = () => {
    if (!statsLoaded) {
      return null;
    }
    return [savannahResult, audioResult, sprintResult, memoryResult].map(
      (resultObj: IStatsGameResult) => (
        <TableContainer component={Paper} key={resultObj.id} className={styles.gameTable}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2} align="center">
                  {resultObj.gameTitle}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Всего изучено новых слов</TableCell>
                <TableCell>{resultObj.dailyLearned || 0}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Процент правильных ответов</TableCell>
                <TableCell>{resultObj.correctPercent || 0}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Серия правильных ответов</TableCell>
                <TableCell>{resultObj.correctSeries || 0}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )
    );
  };

  const renderGraphs = () => {
    return [dailyResult.dailyLearned, dailyResult.learningProgress].map(
      (graphData: IStatsDaily) => {
        if (!graphData) {
          return null;
        }
        const dailyData = Object.values(graphData.data);
        const dailyLabels = Object.keys(graphData.data);
        const data: ChartData<Chart.ChartData> = {
          labels: dailyLabels,
          datasets: [
            {
              label: 'количество слов',
              data: dailyData,
              backgroundColor: `${graphData.backgroundColor}33`,
              borderColor: `${graphData.backgroundColor}FF`,
              borderWidth: 1,
              stack: '1',
              barThickness: 'flex',
              barPercentage: 1,
              categoryPercentage: 1,
              hoverBackgroundColor: `${graphData.backgroundColor}66`,
              hoverBorderColor: `${graphData.backgroundColor}FF`,
            },
          ],
        };

        const { global, bar } = defaults;

        const options: ChartOptions = {
          ...global,
          ...bar,
          responsive: true,
          title: {
            display: true,
            text: graphData.sectionTitle,
            fontSize: 20,
          },
          scales: {
            xAxes: [
              {
                stacked: true,
              },
            ],
            yAxes: [
              {
                stacked: true,
              },
            ],
          },
        };
        return (
          <div className={styles.graphWrapper} key={graphData.id}>
            <Bar data={data} legend={{ display: false }} options={options} />
          </div>
        );
      }
    );
  };

  useEffect(() => {
    dispatch(fetchStatistics(userData));
  }, []);

  useEffect(() => {
    if (Object.entries(statistics).length === 0) {
      return;
    }
    let currDate: moment.Moment;
    let totalLearnedSum: number = 0;
    const savannahTmpResult = {
      id: IGameName.SAVANNAH,
      gameTitle: GAMES.savannah.title,
      dailyLearned: 0,
      correctPercent: 0,
      correctSeries: 0,
      wordsTotal: 0,
      correctTotal: 0,
    };
    const audioTmpResult = {
      id: IGameName.AUDIO,
      gameTitle: GAMES.audio.title,
      dailyLearned: 0,
      correctPercent: 0,
      correctSeries: 0,
      wordsTotal: 0,
      correctTotal: 0,
    };
    const sprintTmpResult = {
      id: IGameName.SPRINT,
      gameTitle: GAMES.sprint.title,
      dailyLearned: 0,
      correctPercent: 0,
      correctSeries: 0,
      wordsTotal: 0,
      correctTotal: 0,
    };
    const memoryTmpResult = {
      id: IGameName.MEMORY,
      gameTitle: GAMES.memory.title,
      dailyLearned: 0,
      correctPercent: 0,
      correctSeries: 0,
      wordsTotal: 0,
      correctTotal: 0,
    };

    const dailyResultTmp: IStatsDailyResult = {
      dailyLearned: {
        sectionTitle: 'Изучено новых слов за день',
        id: 'daily',
        backgroundColor: '#8c7ae6',
        data: {},
      },
      learningProgress: {
        sectionTitle: 'Прогресс изучения новых слов',
        id: 'progress',
        backgroundColor: '#16a085',
        data: {},
      },
    };

    let lastDayLearnedTmp = 0;
    let lastDayTotalTmp = 0;
    let lastDayCorrectTmp = 0;
    const sortedArr = [...Object.values(statistics)].sort(
      (st1, st2) => st1.dateTime - st2.dateTime
    );
    const lastItem = sortedArr[sortedArr.length - 1];
    const lastDate: moment.Moment = moment(lastItem.dateTime).startOf('date');
    sortedArr.forEach((stat) => {
      currDate = moment(stat.dateTime).startOf('date');
      setLastDateStr(lastDate.format('DD.MM.YYYY'));
      if (moment(stat.dateTime).isSameOrAfter(lastDate)) {
        /* Статистика за последний день */
        lastDayLearnedTmp += stat.wordsLearned || 0;
        lastDayTotalTmp += stat.wordsTotal || 0;
        lastDayCorrectTmp += stat.correctTotal || 0;
        switch (stat.gameName) {
          case IGameName.SAVANNAH: {
            fillGameResultWithStats(savannahTmpResult, stat);
            break;
          }
          case IGameName.AUDIO: {
            fillGameResultWithStats(audioTmpResult, stat);
            break;
          }
          case IGameName.SPRINT: {
            fillGameResultWithStats(sprintTmpResult, stat);
            break;
          }
          case IGameName.MEMORY: {
            fillGameResultWithStats(memoryTmpResult, stat);
            break;
          }
          default:
            break;
        }
      }
      const strCurrDate = currDate.format('DD.MM.YYYY');
      if (!dailyResultTmp.dailyLearned.data[strCurrDate]) {
        dailyResultTmp.dailyLearned.data[strCurrDate] = 0;
      }
      dailyResultTmp.dailyLearned.data[strCurrDate] += stat.wordsLearned;
      totalLearnedSum += stat.wordsLearned;
      dailyResultTmp.learningProgress.data[strCurrDate] = totalLearnedSum;
    });

    calcCorrectPercent(savannahTmpResult);
    calcCorrectPercent(audioTmpResult);
    calcCorrectPercent(sprintTmpResult);
    calcCorrectPercent(memoryTmpResult);
    setSavannahResult(savannahTmpResult);
    setMemoryResult(memoryTmpResult);
    setAudioResult(audioTmpResult);
    setSprintResult(sprintTmpResult);
    setCorrectPercent(
      lastDayTotalTmp > 0 ? Math.round((lastDayCorrectTmp / lastDayTotalTmp) * 100) : 0
    );
    setLastDayLearned(lastDayLearnedTmp);
    setDailyResult(dailyResultTmp);
    setStatsLoaded(true);
  }, [statistics]);

  return (
    <div>
      <Header />
      <main className={styles.statsWrapper}>
        <Typography variant="h5" className={styles.title}>
          Моя статистика
        </Typography>
        {isLoggedIn ? (
          <>
            <TableContainer component={Paper} className={styles.totalWrapper}>
              <Table size="small" key="today">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      {lastDateStr}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Всего изучено новых слов</TableCell>
                    <TableCell>{lastDayLearned || 0}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Процент правильных ответов</TableCell>
                    <TableCell>{correctPercent || 0}%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div className={styles.gamesWrapper}>{renderGamesTables()}</div>
            <div className={styles.graphsWrapper}>{renderGraphs()}</div>
          </>
        ) : (
          <span className={styles.warning}>Авторизуйтесь для просмотра изучаемых Вами слов</span>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Statistics;
