import calculateElapsedTime from "../utils/calculateElapsedTime";
import UserAvatar from "./UserAvatar";
import "../styles/Comment.scss";

interface CommentTypes {
    data: {
        description?: string;
        createdAt?: number;
        user: {
            avatar: string;
            username: string;
        };
    };
    children?: any;
}

function Comment(props: CommentTypes) {
    const { description, createdAt, user } = props.data;

    const timeSincePublish = calculateElapsedTime(createdAt as number);

    return (
        <div className="comment">
            <div className="comment__primary-container">
                <div className="comment__user-avatar">
                    <UserAvatar src={user.avatar} />
                </div>

                <div>
                    <p className="comment__username">
                        By <button>@{user.username}</button>
                    </p>

                    {createdAt ? (
                        <p className="comment__publisher-secondary-info">
                            Published {timeSincePublish}
                        </p>
                    ) : (
                        <p className="comment__publisher-secondary-info">
                            Currently Active User
                        </p>
                    )}
                </div>
            </div>

            <div className="comment__secondary-container">
                {!description ? (
                    props.children
                ) : (
                    <p className="comment__message">{description}</p>
                )}
            </div>
        </div>
    );
}

export default Comment;
