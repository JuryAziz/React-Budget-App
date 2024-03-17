import { ConfigProvider, Progress } from 'antd';

const ProgressBar = (props: { targetSaving: number; currentSaving: number }) => {

  let progress: number = (props.currentSaving / props.targetSaving) * 100;
  progress = props.currentSaving !== 0 ? (progress > 100 ? 100 : progress) : 0;

  return (
    <ConfigProvider
      theme={ {
        token: {
          colorSuccess: '#68d0ba',
        },
        components: {
          Progress: {
            circleTextColor: '#FFFaFa',
          },
        },
      }}>
        <Progress
          type='circle'
          percent={progress}
          strokeColor='#68d0ba'
          trailColor='#262727'
        />
    </ConfigProvider>
  );
};

export default ProgressBar;
