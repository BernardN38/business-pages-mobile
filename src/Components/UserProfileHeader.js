import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/user-profile-header.css";
function UserProfileHeader() {
  axios.defaults.withCredentials = true;
  let user = useSelector((state) => state.user.user);
  let userData = useSelector((state) => state.user.userData);
  let rank = useSelector((state) => state.user.rank);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const src =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFRUYGBgVHBIYGBgcFRgcGhgVGBgaGRgaGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISGjEhGCExMTQxMTExMTQxNDQ0PzQ/MTE0ND80PzQ/ND8xMTQxNDExPzExMTExMTExMTExMTExNP/AABEIAMoA+gMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwEEBQAGB//EADwQAAEDAgQEAwUGBQQDAQAAAAEAAhEDIQQSMUEFUWFxIoGREzKhscEGQlJy0eEUI1Ni8BWCkvEzQ6I0/8QAGQEBAQEBAQEAAAAAAAAAAAAAAQACAwQF/8QAIREBAQEBAAIDAAIDAAAAAAAAAAERAiExAxJBE1EEIjL/2gAMAwEAAhEDEQA/ANwU79LKXNTXNQx6qZulhm8BKDiTfQ3B/VOLboA2NbqIH1REoc3iA2hGKYGg0uuIRlHiAaDJ729EQlSiTioSEs++fyj5lGQhe9rdSATbv0RYpQtMvfG2QecGfp6IaTr5eQ087JrWgCw1v6812S8gCTElMWqr2AlrSPCXVAR5SIUudlbl906A8wTr3gptSqwRmewFpJEvGu6ysT9ocNmDC8GTAcIygjqj64drUYwB2VoENHxKa1Y9XjlBtmvD3E3uLqwzilKAcwGaSe8fBE5xXpoELjZLp1muuCD5qa9wRe9rawtYNAKhhztQL/spY4kXBHTZKq0vBABAJbYEzA6o3NA90GTa8lZ04hoYTGUTc6LmFodYy625PoudSjSTY31KJhiwBAHRMosRIBNtSAfNTUpg9yImNuiBtIWN7unXknhUJTqYiLx8fNdUYMuXQG0j9UyF0JrO0okEgDa/pZGpyqJVBa5qIqIUOKgEoZRILKTbqNduAEggrUxNMgLPeEuhBlDKaQlZwSRGm6oMRfkhnuiJXFADmvC4oXvA37DdQS7lHfVLQi6L8kvDU7Tq519PQI2M2mZtfqvI8e4+4B1Ci7LlJD37k8mnZSzWrxvjzMMXD36hDYZIsbzK8RjePYipIdUIaSTlbYCdlnvpx1nUyZ80shO56OJPW6Y14iIHaEsNJRZYRrU5S4ck2jinAyHHseSU9keaHVAsb+Fxcts8i9hNwV6nhXFM5DH6x73PovndOoWGxg81sYXEBzZmCNe/MIYr6LOo5boXPAubRr0XnuEcRzOFOo73hY8yNAtuowxBuHamJFtkSkbH84voAbqfaCY381DGCbNAHYShZmFtr3SK57yCPDvEkgBE2oNJv8FFS+to+PZBVrgCYPhkgdYgK1Yc54m5hLqVYiAXTy09VzDAv7xif+1GR0iCPCDIPM9lLwkvMwWkeYKZCFpM3HxRpxmuUFTK4pAYS4TEEqNey4izksWqIW7xE6rEqobVnnfkk022vq66e8TZJNJukWUNIc4gOcBJcbDoICLOTOWDAn46rqlLwmOUAcrpLWuDn+E3IaDOwEE+pKLrWCpVJGa0lxt028k1gI13Q0mgF0bZR6BMVPIKxNUMY95+41zvgvleGY55JEmTJt+Iyvq1Zgcx7TYOY5s+RXkuE4TIwNMeEm43vZHXWR0+PnXncVQc1rQ8FjZgGN4mCUg4QyIuDey97icKyq3I8SAQfMK7g8Gxg8DAJHILH3d/4XzsYOBAIL3EQ0bDm5cKHhqOcQCyABpJK9vi+GsLiQACdwIWHiODt90AuzG5T9tV+LHlnNOUbpQWxisFka4T4s0N7BZ7aJkmJhdI43nKFkb7XVnBkB/KfqgdYXBuI+KS1950/VZsrNjaFRwdIMZSI5yLz2he8ZiAWNf+INMDnC8Cx4c0OI94A8+69N9msQ9zCw3yaSdJUw23VAJkERE769lLnbAidghcwxaCSZJKgtgg66yd0jwjxaFwsJ92QBzkrhVzBuhzTI7cwpcwmdBJbNtgicBmHQfVHkigC+mg0SgXAwLzJ7eaY/WImdO6BrOulvRalSQeYhS10qHi4nqhfsQjR9YNQXjtKhrd/wDpQB+idGOeDsk5P7k8BLyHomKPZY5+qyKhVrE1ZWfVfGxuhIJQyozSUqdYmZ+CjhoO6HNKANjY7+qi/VVWCj/tRKGDeELm85vZSxNd8MeeTXLz2GaQB+i0PtDxAUaDnfecWsA5kn4rL4bxFj22PiGrSLrHcr1fBkaVBslXWsIEzY91nHEZBMXOllRqYrEvscjG3iTc+S5TnXp668Np53VJ535LLFWszUFw1125q7RxIcAeabzjM62MPisA8tTe6wqznTqvVccp5mFwEFsei8w/XounN8OHyc5SA/nKWJV7CcOfWcQwC2ribBJxeEfSeWPEOA9RzCbZ/bF5uNHDeFjeZ0HW5XofswC0VXwZMAHWBF7eawWMkMM2A+JBH1XqfsywZHmTLn3vsANFbrjrVk5R+I80FQOJGpgtvMST0TagJNptof2Uhl5nkfQJq8B9obkDSZXGrcgNMCBmGlwhpNgRMkkk+ZUYd2+YuJJtFheylcNqVIjqYQvfEwJ26k91BaSJjxTvyHVQKUm+2kGL7ypCYTJnoeyYWpVJgk68k0KZriEGXdGgqvDRLjASzqQUFl2cb9+voq38Yzn80xr616Go9IciLkL1NALkIkovP4BTmKESXwFxfb0TC3ZAW/RQ8AzXtfN8O6n2iJTAStZ3FcN7WkYgOZD2E7Fuq8u6k8w8uaXgPE7Q6IIi8i+q9bxU/wAtw/Flb6lYj6MRzJC599Y9Xw87NXKbmuDQeVz1hUn0QHvDmZs7S1pJILSREthXnAWuPDF0NeDBBkFcvM8vXeZZjOwXD3Uv/bnDo8FyBaNStF9Jogi3yTqWEtmjpKh42KrdZ+uMvijJpu7LzfC8J7R8atYJPeeS3uLV8rCOw85sq/2ZY6HkRLzlBOkBNv8Aq59TenosPSaylla0TM27wPovKfbGq11drQQSxrWk9SdP85L03EsW5odYS1ojKNSBMxuvAYdznvzOOpLnHqPrdPHP7V8vUnONS4bA2hunVev+z1OKI6ucfkPovIXL4ANyI7kWXu8LSLGMZljKIN7zqtvDYa90CfhuSuL4EnePJKguIMxyEbblFckt+PMLakGHCbancfqjlKY3KYGmw68k0BSRKhcuUxXEKFK5QQUmuybkw2Ous7wnJD6UuLjewAGw5lTU8IqUQb66Ry785UZRyCKDcQZ0mdo2VT+CP4n/APMpka1vuK4/ouKglTLkK5SFIJUBSFwCFPaCIQlEXLkpQ4wwmmSNWFrvIG6wWY9oe3Np816s/OxXmeJ4FrXOOkQ4flO8Ln1zP16vh7vpYbVpucYB7ZlLWNOYExy6JnDuFl4D/aUw0idbjuEVSlTEj+IYcpIOVs7WusY9M6peHxbhLHeRG6dVbaVRLfFLbsMQdD1srps252WMxddMfieFD25SSOyLhlMN/ljkSCdoKtObMnZLww/mDsfTdN9MT/o2syJ3JESvLvwzWPdlaRmi/aV6zFEGSLwYHfmsPFUpeAASbwJ1Jla56Z+bnwPgQBxLQYtmIHWF7ReDwzjTqsLxBa4zI584Xs6eJa4ktfmjWNBK6T28X6eXD0XSJQFtu6gOEm9+X6JJphC10j/PghqGxjpYoXmY5zI6JGaYDdRmEx2VYuLQ53vFuaO52RNsAY92epJKJVeTwVKTTaNpE3P7hNCWa6En2hzQQd5MeieUqqJFjH+aKtMwtlbMdNZF9bdE6DySnUoOYa6QZ+CLMenxVp1okqISm1Zbmg3m26QzFNA1JN57i5EqWLgChBTqh2gPmIB7IgkuUQfguJS62wv4j8NUVkGHeCJHY9SnAJehjY6D6LhUGjTe94RDjmvFptJIhV+JYfOwx7zQS0841XPJkiXEtId7oi9intLgDrobEDcdCrGpcuvG4VjZLogkXuRrstnB0mZRaXA9I8gsuiwxp3laFFxAMDzXK+30OevBtUzZA55UVHgNj1KqOxQmG3O3dORzvW1azACO3mUxlEi18z7u/taNEOGBB/u25Cd1qYbCF5ys31dyWP1qeJtZz2FxyMaXGwt9VpYbgAb46ozPkQ2fC3rHNekw1FlJga0dS46uO5VeuSb81vnlw+T5L14eU4rwQPJcCQbmR8lk4fC16JzUy0g+8DeY27r2NbN5Kg+/yXWR5/1m/wCvhrT7RjmutqIEq63HsN2vYfCNfxHSFFWk1whwBHULB4rwfLL6ZgAg5e19PJWJ6hribHKR/aVJqAODYjkdp5d15rg/GCx+Wo0ZT94bdwt5jCJfAcHEuB3bsD2RqWHua0SbAxfrsgrU5BjXeErFNeZjKWtEmZEnWya5xdlA3uY00TB5Fm6H0RAqVyRXKMqlQdUMoLUOVSWoZUll1EZcsxy6IWYUbkkDNb82pTlIKca0tjIAAJtzJPxRqQVEKh1EIKgm41bcd90ZKCo6ATyCqJ7Lc/ZzXDpBN+6ikCYluUNmOqY0mBOsSVzjAnlKmnOYDci8Ab6KXC0dEJqiN7+vmjR7TKxXCpJLHAZtQ6YnmClM4dVFvB1Ob9ltKCVfWNfydR4/FMqB5Y/wkG0GxHOd0zDsDdNea9PicO17cjxI2O4PMFedxWEfRMOuwnwv8/vcljrmO3x9xfwFAvIY27nb8l7GjSbTYGi5Gp5n6rG+zVLJSdXdq4lrB6StdnhMvGZ591vLyWOef1fJ3fRwE3NzsJ0PVV6gnWE55Ma3OttFXidPUrr4jl7VarFRqs3ha7qfOSq1VgTrOMoSVD2zaEyuzKbKGutdV8h5TiuDyOzNdDXTNhE7D5q9wDiTmxTeQ4H3DoQdh1WpiqDXsLSAQfh2Xkq+Hcx+WYLTbkI0IQnu3RBm3OdlXaxuxc2wAtYgdwqPDsearRPvU7PE2MmxK03OdoRI6G0diqVegvc5o/EOe6cEpgt02TYSza5cuUgKBaHL0TXMKXCQuyoUriAi+jEKFLlJFlr8ICk4pxDbCZI36p7kJCzfJntV8V3XEwNb+ikySA6wE3J1G3mrBCUDJtoOk/NH4ZQe0Ag8+f67qX3cPEQBGURrOvcI3taL5RO3dMnRU8JLQRqVy4LgtC1ACDEMlhabtdYjojTqOHzEZjA6alB5FSfIY1o9wAMEfFatChkEmMzh5+uyHDtY33WnuTfyVhhF7GTvKz6btLLB970C4t8grApN5x3XPpkbT1V4Cmaar1WK8XBIrBNTJxDFQeyDZbL6cqhWpQUUKb+qxON0SWh/4deoNoWw9DWpBzSCbEGbdFew8rw3FeyeHn7xIfyLSYXti2CRteF4WtTglszC9VwXFl9MB2rIaba2skVpBcpUJZcoUripOzQu9qhJ+ii6guIURKgqpiFK5cTZaIShIUqJRWkVQSLJbmGLeGNh9U1qhGaldlAhxJJdOg2HdHUc4XkRyHNOKWxk3OonVS0bTPQfNMQgIlCgaJMBbGFw3NZuDZL+y9BTbCLW5ENohE1qbHNC9kXGiNMmlublN9CiY8jdG9siEhjtQdRoiVYsuaHDqszHUzLWc7+QK0qWhCrZQXvO7WW89VW+VhD2C3ms7GsuY5BazWRlG6oVmSSeqfAYtWn8Ep+iuYpsAlVHtSzXmeK4UtcHAeE/NHwLGBlQtd7r7f7hotPieHL2EAaCV5gu0OkadCpV76dlMqtgsQHsa8bgT0MXTiqeWKNqgqBKklICSoUlCmLV0s6n1QFlt0p3EaO1RvqUP+o0f6jfU/ojK34OjqfVRHdJ/jaX4x6H9EP8bT2eD5O/RROcFncWxT2NYWOIl7GmwMgm40VujXY8EscHQSDGx5LO+0PuM6VKfzQm05Qpd/nmFCZfCcp/zRQuTujRLpULigrvDGG5PNbjAsrh7IaAe5Wi0obiwAuZu09wu2soeNxqEYo4OhVsRZwd5Ky/Y81VPiBHL/AiwrdFIpWe7s1Oww8A7BIa05nOOlvXsrEF3hlx2B9ToqeWwsreM2ZuYceg2Salh1OnmmLGTjKdm+ZPZUq9hG61cQ2NfeOg5Dqs4M1c4pZsUqrYEc15HHYbK8xIEkgdDovW1zLj8FicWokuBHY9lM0X2acZewncPb+Xceq9IvI8LfkrMcXNgTmg3g7K/W468EwxgZMNzEyeR0RJjN8vQNKiFnUeM0iBncGOkyLnc6dEz/VaH9QfFag+q6SgVUcToae0b+yL+Po/1WeqViC6n+Nnoo9pT/Gz0WS+mQzOYy858ktvibmBBB5Fej68f24c3uzxG0a1P8bP/pLq4ik7wGoIOuVxaQdrqjgGeIS02uVbr1KReczQAeYt681w67nPWR6uPh66523Cvsy0BuIDTIbXcBeTGRmvnKZ9oh/LbY+/TjvKp8VwALS/DOIMyQw2cesbrJxPGXPwxY+72PpODpIJDXXDuvVcm+ubHvyw8jtseSFrDyPohbiabgHCiCCAZFV/IdUPtGEk+wIG381/nqV0kc/JuTulsfmDy0WpmHSQ0mwPgB94XGm6E1qY+5HX2zxb1VLE8TwzfeEm9hUe4qMXaeIBEw4aaiNUZxLNzF4vZYNfjjTalSd+Z73x0tKov9o+73uNwQJtIuAsXqR0nFvl9Awb5J7rSDrrB4PXLmtP4oW3q4CVTpZi5FlDXXTALJLxdLOiIF287joqFP3yDsCPkrjz4beR3VNzhnHUfGEWNRda7Kwdkvl8J+ZSX1sxDQLN1O07I6hDfE6XOOgHJHPs4Am5cdXaD5ABKe6Ji7zvfw/umtJmYBdy2aI+aWWgbyTqU/oVK7YG5J1Mn6rNfe2wWnidO9lSqCBG5+HdIrMxIjusviVIFl+618TTk3WZjDma5vQ/sjGcZ2CeA8AAA7AD5JHHaeZmhMHntBn/ADok8OreNrXc4B5LXfTmbdO4VBPDy+HxWzr8j+qstxDI38gmYzh0HMyYOo5dlVdh3SbO9AtyH2czFUz+P0/dT7an/d6KsxhGrXnsAlZXcj6JxY9Fi+IzTZRaDZ8ucdIN7eqtuwjWsJZcj4rCxfvnuF6XhWg7H5Ln8vi11/x+Z9Y5rHNpiSw54veY1VjHvApgWLjAAtqbKj/7ANs+m2nJWOK60vzsXKV6eojhhytDHay4nSJJWXjcCx1Q2jNJWnU/8h/M75BIf/5AqW6OuZYzG4Ujwh7wBsCQAoOCcfvvP+93yWpiPePkkO27hdJa5TmM8cOE3JPckq3QwgAsE+mntUfrC2U+6MN01TBqucudanpv8EcGtaNcoM9yVvYOS4nlosLgvuDy+q9HgdV059PP17XFWqG6vO0VWrutaISX/ss1lQuqFrSBYkkmAD+6uVNvzD5qi0fzqnZn1Uou4fI0QXAnzKkPvZpJ5kiFFMW9FA/RTSBnNiQB01UkAIm6pdRQqpX5/BVnNiSbk6lWaiRUUyzsXosgC3V3XZbGKWSfeYpV5rEsyViI0ePjC3aRvl2JhZXGv/0P/O35BadL3m92qZW6uEIvmbA0kEJLsI/nT9VoYn3fNvzVJ4+vzWZ1dVKdhHj+n0GZL/hX/hZ/yTSwch6LvZt5D0C6tR//2Q==";
  const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/",
  });

  useEffect(() => {
    instance
      .get(`http://localhost:5000/api/user/${user.token.user_id}`)
      .then((resp) => {
        dispatch({ type: "SET_USER_DATA", payload: resp.data });
      });
    instance.get(`http://localhost:5000/api/ranks`).then((res) => {
      dispatch({
        type: "SET_USER_RANK",
        payload: res.data[user.token.user_id],
      });
    });
  }, []);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop={1}
      bgcolor="paper.secondary"
      width={"100%"}
    >
      <Card sx={{ width: "90%" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding={1}
        >
          <Avatar sx={{ height: "70px", width: "70px" }} src={src} />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {userData.username}
          </Typography>
        </CardContent>
        <Stack direction="row">
          <div className="user-header-badge">Score: {userData.score}</div>
          <div className="user-header-badge">
            Reviews: {userData.reviews.length}
          </div>
          <div className="user-header-badge">Rank: {rank}</div>
        </Stack>
      </Card>
    </Box>
  );
}
export default UserProfileHeader;
