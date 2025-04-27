import { useAppSelector } from '@/app/redux';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

export const BootstrapTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  )
)(({ theme }) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  return {
    [`& .${tooltipClasses.arrow}`]: {
      color: isDarkMode ? theme.palette.grey[100] : theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: isDarkMode
        ? theme.palette.grey[100]
        : theme.palette.common.black,
      color: isDarkMode
        ? theme.palette.common.black
        : theme.palette.common.white,
      fontSize: '1rem',
      maxWidth: 240,
      padding: '8px 12px',
      borderRadius: 4,
    },
  };
});
