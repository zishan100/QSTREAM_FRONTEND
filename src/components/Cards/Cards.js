import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid2";
import style from "./Cards.module.css";
import img from '../../Assets/youtube-thumbnail-template.webp'
import { timeAgo } from '../../Utils/Helpers'
import { CircularProgress, Box } from "@mui/material";
import ProgressBar from "../ProgressBar/ProgressBar";

export default function Cards({
  id,
  title,
  url,
  thumbnail,
  releaseDate,
  viewCount,
  clickEvent,
  progress
}) {
  return (
    <Card
      className={style.cardContainer}
      onClick={clickEvent ? (e) => clickEvent(e, { id, url }) : undefined}
      style={{ cursor: !clickEvent ? 'default' : 'pointer' }}
    >
      <CardMedia
        component="img"
        image={!thumbnail ? img : thumbnail}
        alt={title}
        className={style.cardMedia}
      />
      <Typography
        sx={{ fontSize: ".9rem", fontWeight: 500 }}
        gutterBottom
        variant="h6"
        component="div"
      >
        {title}
      </Typography>
      <CardContent className={style.cardContent}>
        <Typography
          sx={{
            fontSize: ".9rem",
            color: "#57534e",
            fontWeight: '600'
          }}
          gutterBottom
          variant="caption"
        >
          views {viewCount}
        </Typography>
        <Typography
          sx={{
            fontSize: ".9rem",
            color: "#57534e",
            marginLeft: 2,
            fontWeight: '600'
          }}
          gutterBottom
          variant="caption"
        >
          {timeAgo(releaseDate)}
        </Typography>
      </CardContent>
      {progress > 0 && <ProgressBar value={progress} />}

    </Card>
  );
}
