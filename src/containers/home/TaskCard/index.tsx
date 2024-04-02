import { Box, Typography, useTheme } from "@mui/material";
import TurnedInRoundedIcon from "@mui/icons-material/TurnedInRounded";

interface ItemProps {
  title: string;
  description: string;
  date: string;
  priority: string;
  type: string;
  id: string;
}

export const TaskCard = ({ item }: ItemProps | any) => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        borderRadius: 4,
        bgcolor: palette.neutral.min,
        p: 2,
        border: `1px solid ${palette.neutral[300]}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            lineHeight: "26px",
            color: palette.neutral[700],
            mb: 1,
          }}
        >
          {item.title}
        </Typography>
        <TurnedInRoundedIcon
          sx={{
            color:
              item.priority == "urgent"
                ? palette.error.main
                : item.priority == "high"
                ? palette.warning.main
                : item.priority == "normal"
                ? palette.primary.main
                : item.priority == "low"
                ? palette.neutral[300]
                : palette.neutral[900],
            mr: 1,
          }}
        />
      </Box>
      <Typography
        sx={{
          mt: 1,
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          WebkitLineClamp: 3,
          overflow: "hidden",
          lineHeight: "26px",
          color: palette.neutral[700],
          maxHeight: "75px",
          mb: 1,
        }}
      >
        {item.description}
      </Typography>
      <Typography variant="button" sx={{ color: palette.neutral[400] }}>
        {item.date}
      </Typography>
    </Box>
  );
};
