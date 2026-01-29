import {google } from "@ai-sdk/google";
import {streamText} from "ai";
import {config} from "../config/google.config.js";
import chalk from "chalk";
import { apiKey } from "better-auth/plugins";

export class AIService{
    constructor(){
        if(!config.googleApiKey){
            throw new Error("Google api key is not defined in the env")
        }

        this.model = google(config.MINDHSELL_MODEL, {
            apiKey: config.googleApiKey
        })
    }
    /**
     * Send a message and get streaming response
     * @param {Array} messages
     * @param {Function} onChunk
     * @param {Object} tools
     * @param {Function} onToolCall
     * @returns {Promise<Object>}
     */

    async sendMessage(messages, onChunk, tools = undefined, onToolCall =null){
        try {
            const streamConfig = {
                model: this.model,
                messages: messages,
                temperature: config.temperature ?? 1
            }
            const result = streamText(streamConfig);
            let fullResponse = ""
            for await (const chunk of result.textStream){
                fullResponse += chunk;
                if(onChunk){
                    onChunk(chunk)
                }
            }
            const fullResult = result;
            return {
                content: fullResponse,
                finishResponse: fullResult.finishReason,
                usage: fullResult.usage
            }
        } catch (error) {
            console.log(chalk.red("AI Service Error:"), error.message);
            throw error;
        }
    }

    /**
     * Get a non-streaming response
     * @param {Array} messages -Array of message objetcts
     * @param {Object} tools -Optional tools
     * @returns {Promise<string>} Response text
     */

    async getMessage(messages, tools=undefined){
        let fullResponse = "";
        await this.sendMessage(messages, (chunk)=>{
            fullResponse += chunk
        })

        return fullResponse
    }

}