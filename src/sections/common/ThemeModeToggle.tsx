import { Switch, Tooltip } from '@mui/material';
import { useRecoilState } from 'recoil';
import { themeModeState } from 'src/state/theme-mode';

function ThemeModeToggle() {
  const [themeMode, setThemeMode] = useRecoilState(themeModeState);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeMode(event.target.checked ? 'dark' : 'light');
  };
  localStorage.setItem('themeMode', themeMode);
  return (
    <Tooltip title={themeMode === 'dark' ? '라이트 모드로 보기' : '다크 모드로 보기'}>
      <div>
        <Switch checked={themeMode === 'dark'} onChange={handleChange} />
      </div>
    </Tooltip>
  );
}

export default ThemeModeToggle;
