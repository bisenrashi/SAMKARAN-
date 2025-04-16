import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function CardDefault(props) {
 const data = { title: props.title, description: props.description, img: props.img, url: props.url}
  return (
    <Card className=" mr-3 lg:mb-5 w-96 h-96 shadow p-2">
      <CardHeader color="blue-gray" className=" h-60">
        <img
          className=" object-cover w-full h-full rounded-2xl"
          src={props.img}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
      <Link to={props.url}> <Typography variant="h5" color="blue-gray" className="mt-2 hover:underline">
          {props.title}
        </Typography></Link>
        <Typography>
          {props.description}
        </Typography>
      </CardBody>
      <CardFooter className=" flex space-x-5 pt-2">
        <Link to={props.url}><Button className=" text-sm lg:text-md bg-[#28B889]" >Start Learning</Button></Link>
        <Link  to={"/quiz"} state={data}><Button className=" bg-transparent text-sm text-black border-2 border-black" > Take Test</Button></Link>
      </CardFooter>
    </Card>
  );
}