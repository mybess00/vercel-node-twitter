export default function handler(req, res) {
    if (process.env.ALLOW_DOMAIN == req.headers.origin){
        const { name } = req.query;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': 'twitter135.p.rapidapi.com'
            }
        };
        fetch(`https://twitter135.p.rapidapi.com/TweetDetail/?id=${name}`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response.data)
                const tweet = {
                    data: {
                    "user_name": response.data.threaded_conversation_with_injections.instructions[0].entries[0].content.itemContent.tweet_results.result.core.user_results.result.legacy.name,
                    "user_id": response.data.threaded_conversation_with_injections.instructions[0].entries[0].content.itemContent.tweet_results.result.core.user_results.result.legacy.screen_name,
                    "user_image": response.data.threaded_conversation_with_injections.instructions[0].entries[0].content.itemContent.tweet_results.result.core.user_results.result.legacy.profile_image_url_https,
                    "tweet": response.data.threaded_conversation_with_injections.instructions[0].entries[0].content.itemContent.tweet_results.result.legacy.full_text,
                    "date": response.data.threaded_conversation_with_injections.instructions[0].entries[0].content.itemContent.tweet_results.result.legacy.created_at,
                    "fav": response.data.threaded_conversation_with_injections.instructions[0].entries[0].content.itemContent.tweet_results.result.legacy.favorite_count,
                    "retweet": response.data.threaded_conversation_with_injections.instructions[0].entries[0].content.itemContent.tweet_results.result.legacy.retweet_count,
                    "comment": response.data.threaded_conversation_with_injections.instructions[0].entries[0].content.itemContent.tweet_results.result.legacy.reply_count,
                    "media": parsedImages(response.data.threaded_conversation_with_injections.instructions[0].entries[0].content.itemContent.tweet_results.result.legacy.extended_entities.media),
                    }
                }
                return res.json(tweet)
            })
            .catch(err => console.error(err));
    } else {
        res.status(403).send('Forbidden');
        return;
    }
    
}

const parsedImages = (obj) => {
    const imgLinks = [];
    obj.map(element => {
        if (element.type == 'photo'){
            imgLinks.push(element.media_url_https);
        }
    })
    return imgLinks;
}