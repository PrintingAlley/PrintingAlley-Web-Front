import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  Switch,
  FormLabel,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { useState } from 'react';

interface BusinessDay {
  open: Date | null;
  close: Date | null;
  isClosed: boolean;
}

interface BusinessHours {
  weekdays: BusinessDay;
  weekends: BusinessDay;
  [key: string]: BusinessDay;
}

interface BusinessHoursFormProps {
  onSubmit: (summary: string) => void;
}

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
const weekdays = daysOfWeek.slice(0, 5);
const weekends = daysOfWeek.slice(5);

const initialBusinessHours: BusinessHours = {
  weekdays: { open: null, close: null, isClosed: false },
  weekends: { open: null, close: null, isClosed: false },
  월: { open: null, close: null, isClosed: false },
  화: { open: null, close: null, isClosed: false },
  수: { open: null, close: null, isClosed: false },
  목: { open: null, close: null, isClosed: false },
  금: { open: null, close: null, isClosed: false },
  토: { open: null, close: null, isClosed: false },
  일: { open: null, close: null, isClosed: false },
};

function BusinessHoursForm({ onSubmit }: BusinessHoursFormProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewAllWeekdays, setViewAllWeekdays] = useState(false);
  const [viewAllWeekends, setViewAllWeekends] = useState(false);
  const [businessHours, setBusinessHours] = useState<BusinessHours>(initialBusinessHours);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleTimeChange =
    (type: 'all' | 'individual', day: string, timeType: 'open' | 'close') =>
    (newValue: Date | null) => {
      setBusinessHours((prevHours: BusinessHours) => {
        if (type === 'all') {
          const updatedHours = { ...prevHours };
          if (day === 'weekdays') {
            updatedHours.weekdays = { ...updatedHours.weekdays, [timeType]: newValue };
          } else if (day === 'weekends') {
            updatedHours.weekends = { ...updatedHours.weekends, [timeType]: newValue };
          }
          Object.keys(updatedHours).forEach((key) => {
            if (
              (day === 'weekdays' && weekdays.includes(key)) ||
              (day === 'weekends' && weekends.includes(key))
            ) {
              updatedHours[key] = { ...updatedHours[key], [timeType]: newValue };
            }
          });
          return updatedHours;
        }

        return {
          ...prevHours,
          [day]: { ...prevHours[day], [timeType]: newValue },
        };
      });
    };

  const formatTime = (time: Date | null): string =>
    time
      ? time.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
      : '';

  const isSameTime = (time1: Date | null, time2: Date | null): boolean =>
    time1?.getTime() === time2?.getTime();

  const getFormattedSummary = (businessHoursData: BusinessHours): string => {
    // 평일과 주말의 모든 시간이 동일한지 확인
    const allWeekdaysSame = weekdays.every(
      (day) =>
        (isSameTime(businessHoursData[day].open, businessHoursData.weekdays.open) &&
          isSameTime(businessHoursData[day].close, businessHoursData.weekdays.close)) ||
        businessHoursData[day].isClosed
    );

    const allWeekendsSame = weekends.every(
      (day) =>
        (isSameTime(businessHoursData[day].open, businessHoursData.weekends.open) &&
          isSameTime(businessHoursData[day].close, businessHoursData.weekends.close)) ||
        businessHoursData[day].isClosed
    );

    // 평일과 주말이 모두 휴무인지 확인
    const allWeekdaysClosed = weekdays.every((day) => businessHoursData[day].isClosed);
    const allWeekendsClosed = weekends.every((day) => businessHoursData[day].isClosed);

    // 매일 요약
    if (allWeekdaysSame && allWeekendsSame) {
      if (
        isSameTime(businessHoursData.weekdays.open, businessHoursData.weekends.open) &&
        isSameTime(businessHoursData.weekdays.close, businessHoursData.weekends.close) &&
        businessHoursData.weekdays.isClosed === businessHoursData.weekends.isClosed
      ) {
        if (businessHoursData.weekdays.isClosed) {
          return '매일 휴무';
        }
        return `매일 ${formatTime(businessHoursData.weekdays.open)} - ${formatTime(
          businessHoursData.weekdays.close
        )}`;
      }
    }

    let summary = '';
    let closedDays = '';

    // 평일 시간 요약
    if (allWeekdaysSame && !allWeekdaysClosed) {
      if (
        !businessHoursData.weekdays.isClosed &&
        businessHoursData.weekdays.open &&
        businessHoursData.weekdays.close
      ) {
        summary += `평일 ${formatTime(businessHoursData.weekdays.open)} - ${formatTime(
          businessHoursData.weekdays.close
        )}`;
      }
    }

    // 개별 평일 시간 요약
    if (!allWeekdaysSame) {
      weekdays.forEach((day) => {
        const dayHours = businessHoursData[day];
        if (dayHours && dayHours.open && dayHours.close) {
          if (summary) summary += ', ';
          summary += `${day} ${formatTime(dayHours.open)} - ${formatTime(dayHours.close)}`;
        }
      });
    }

    // 주말 시간 요약
    if (allWeekendsSame && !allWeekendsClosed) {
      if (
        !businessHoursData.weekends.isClosed &&
        businessHoursData.weekends.open &&
        businessHoursData.weekends.close
      ) {
        if (summary) summary += ', ';
        summary += `주말 ${formatTime(businessHoursData.weekends.open)} - ${formatTime(
          businessHoursData.weekends.close
        )}`;
      }
    }

    // 개별 주말 시간 요약
    if (!allWeekendsSame) {
      weekends.forEach((day) => {
        const dayHours = businessHoursData[day];
        if (dayHours && dayHours.open && dayHours.close) {
          if (summary) summary += ', ';
          summary += `${day} ${formatTime(dayHours.open)} - ${formatTime(dayHours.close)}`;
        }
      });
    }

    // 휴무일 요약
    daysOfWeek.forEach((day) => {
      const dayHours = businessHoursData[day];
      if (dayHours && dayHours.isClosed) {
        closedDays += closedDays ? `, ${day}` : `${day}`;
      }
    });

    // 휴무일을 요약에 추가
    if (closedDays) {
      summary += `${summary ? ', ' : ''}휴무일: ${closedDays}`;
    }

    return summary;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formattedSummary = getFormattedSummary(businessHours);
    onSubmit(formattedSummary);
    handleClose();
  };

  const handleChangeViewAllWeekdays = (event: React.ChangeEvent<HTMLInputElement>) => {
    setViewAllWeekdays(event.target.checked);
    setBusinessHours((prevHours) => {
      const updatedHours = { ...prevHours };
      weekdays.forEach((day) => {
        updatedHours[day] = { ...updatedHours.weekdays };
      });
      return updatedHours;
    });
  };

  const handleChangeViewAllWeekends = (event: React.ChangeEvent<HTMLInputElement>) => {
    setViewAllWeekends(event.target.checked);
    setBusinessHours((prevHours) => {
      const updatedHours = { ...prevHours };
      weekends.forEach((day) => {
        updatedHours[day] = { ...updatedHours.weekends };
      });
      return updatedHours;
    });
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen} size="large" sx={{ flexShrink: 0 }}>
        영업 시간 설정
      </Button>
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>영업 시간 설정</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" variant="standard">
            <FormGroup sx={{ gap: 1.5, mt: 1 }}>
              <Stack direction="row" gap={2}>
                <TimePicker
                  label="평일 오픈 시간"
                  value={businessHours.weekdays.open}
                  onChange={handleTimeChange('all', 'weekdays', 'open')}
                />
                <TimePicker
                  label="평일 닫는 시간"
                  value={businessHours.weekdays.close}
                  onChange={handleTimeChange('all', 'weekdays', 'close')}
                />
                <Stack direction="row" alignItems="center" sx={{ flexShrink: 0 }}>
                  <FormLabel disabled>개별 설정</FormLabel>
                  <Switch checked={viewAllWeekdays} onChange={handleChangeViewAllWeekdays} />
                </Stack>
              </Stack>
              {viewAllWeekdays &&
                weekdays.map((day) => (
                  <Stack key={day} direction="row" gap={2}>
                    <TimePicker
                      label={`${day} 오픈 시간`}
                      value={businessHours[day].open}
                      onChange={handleTimeChange('individual', day, 'open')}
                      disabled={businessHours[day].isClosed}
                    />
                    <TimePicker
                      label={`${day} 닫는 시간`}
                      value={businessHours[day].close}
                      onChange={handleTimeChange('individual', day, 'close')}
                      disabled={businessHours[day].isClosed}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={businessHours[day].isClosed}
                          onChange={(event) =>
                            setBusinessHours({
                              ...businessHours,
                              [day]: { ...businessHours[day], isClosed: event.target.checked },
                            })
                          }
                        />
                      }
                      label="휴무일"
                      sx={{ flexShrink: 0 }}
                    />
                  </Stack>
                ))}
              <Stack direction="row" gap={2}>
                <TimePicker
                  label="주말 오픈 시간"
                  value={businessHours.weekends.open}
                  onChange={handleTimeChange('all', 'weekends', 'open')}
                />
                <TimePicker
                  label="주말 닫는 시간"
                  value={businessHours.weekends.close}
                  onChange={handleTimeChange('all', 'weekends', 'close')}
                />
                <Stack direction="row" alignItems="center" sx={{ flexShrink: 0 }}>
                  <FormLabel disabled>개별 설정</FormLabel>
                  <Switch checked={viewAllWeekends} onChange={handleChangeViewAllWeekends} />
                </Stack>
              </Stack>
              {viewAllWeekends &&
                weekends.map((day) => (
                  <Stack key={day} direction="row" gap={2}>
                    <TimePicker
                      label={`${day} 오픈 시간`}
                      value={businessHours[day].open}
                      onChange={handleTimeChange('individual', day, 'open')}
                      disabled={businessHours[day].isClosed}
                    />
                    <TimePicker
                      label={`${day} 닫는 시간`}
                      value={businessHours[day].close}
                      onChange={handleTimeChange('individual', day, 'close')}
                      disabled={businessHours[day].isClosed}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={businessHours[day].isClosed}
                          onChange={(event) =>
                            setBusinessHours({
                              ...businessHours,
                              [day]: { ...businessHours[day], isClosed: event.target.checked },
                            })
                          }
                        />
                      }
                      label="휴무일"
                      sx={{ flexShrink: 0 }}
                    />
                  </Stack>
                ))}
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit}>
            적용
          </Button>
          <Button variant="soft" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BusinessHoursForm;
