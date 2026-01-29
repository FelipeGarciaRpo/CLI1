import prisma from "../lib/db.js";

export class ChatService {
    /**
     * @param {string} userId -User ID
     * @param {string} mode -chat, tool, or agent
     * @param {string} title -Optional conversation title
     */

    async createConversation(userId, mode="chat", title= null){
        return prisma.conversation.create({
            data: {
                userId,
                mode,
                title: title || `New ${mode} conversation`
            }
        })
    }
    /**
     * @param {string} userId -User ID
     * @param {string} conversationId -Optional conversation ID
     * @param {string} mode -chat, tool or agent
     */

    async getOrCreateConversation(userId, conversationId=null, mode="chat"){
        if(conversationId){
            const conversation = await prisma.conversation.findFirst({
                where: {
                    id: conversationId,
                    userId
                },
                include: {
                    messages: {
                        orderBy: {
                            createdAt: "asc"
                        }
                    }
                }
            });
            if(conversation) return conversation
        }

        return await this.createConversation(userId, mode)
    }

    /**
     * @param {string} conversationId -Conversation ID
     * @param {string} role -user, assistant, system, tool
     * @param {string|objetct} content -Message content
     */

    async addMessage(conversationId, role, content){
        //Convert content to JSON string if it's an object
        const contentStr = typeof content === "string"
        ? content
        : JSON.stringify(content)

        return await prisma.message.create({
            data: {
                conversationId,
                role,
                content: contentStr
            }
        })
    }

    /**
     * Get conversation messages
     * @param {string} conversationId -Conversation ID
     *
    */

    async getMessages(conversationId){
        const messages = await prisma.message.findMany({
            where: {conversationId},
            orderBy: {createdAt: "asc"}
        });

        return messages.map((msg)=>({
            ...msg,
            content: this.parseContent(msg.content),
        }))
    }

    /**
     * Get All conversations for a user
     * @param {string} userId -User ID
     */

    async getUserConversation(userId){
        return await prisma.conversation.findMany({
            where: {userId},
            orderBy: {updatedAt: "desc"},
            include: {
                messages: {
                    take: 1,
                    orderBy: {createdAt: "desc"}
                }
            }
        })
    }

    /**
     * Delete a conversation
     * @param {string} conversationId -Conversation ID
     * @param {string} userId -User ID (for security)
     */

    async deleteConversation(conversationId, userId){
        return await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userId,
            }
        })
    }

    /**
     * @param {string} conversationId -Conversation ID
     * @param {string} title -New title
     */

    async updateTitle(conversationId, title){
        return await prisma.conversation.update({
            where: {id: conversationId},
            data: {title},
        });
    }

    /**
     * Helper for parse content (JSON or string)
    */

    parseContent(content){
        try {
            return JSON.parse(content)
        } catch (error) {
            return content;
        }
    }

    /**
     * Format messages or AI SDK
     * @param {Array} messages -Databases messages 
    */

    formatMessagesForAI(messages){
        return messages.map((msg)=>({
            role: msg.role,
            content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content)
        }));
    }

}