import {FC} from "react";
import {Box, Divider, Text, VStack} from "@chakra-ui/react";
import Comment from "./Comment";

interface Props {
    title: string;
    body: string;
    postedAt: Date;
}

const Post: FC<Props> = ({title, body, postedAt}) => {
    // TODO: Implemnt a Post!
    return ();
}

export default Post;