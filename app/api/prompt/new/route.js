import Prompt from "@models/prompt";
import {connectToDB } from "@utils/database";


const handler = async (request) => {
    const { userId, prompt, tag } = await request.json();

    try {
        console.log("In the try method")
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag });
        console.log(newPrompt);
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.log("In the catch method")
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}

export { handler as POST}