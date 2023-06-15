import {useSelector} from "react-redux";

export default function Profile() {
    const {user} = useSelector((state) => state.currentUser)
    return (
        <>
            <h1>Hi, {user.second_name + " " + user.first_name}</h1>
        </>
    );
}