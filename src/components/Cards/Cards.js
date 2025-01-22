import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid2";
import style from "./Cards.module.css";

export default function Cards({
  id,
  title,
  url,
  thumbnail,
  releaseDate,
  clickEvent,
}) {
  return (
    <Grid size={{ xs: 8, sm: 6, md: 3 }}>
      <Card
        className={style.cardContainer}
        onClick={(e) => clickEvent(e, { id, url })}
      >
        <CardMedia
          component="img"
          image={thumbnail}
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
        <Typography
          sx={{
            fontSize: ".9rem",
            color: "#57534e",
          }}
          gutterBottom
          variant="body2"
        >
          {releaseDate}
        </Typography>
      </Card>
    </Grid>
  );
}
