const { Schema, model, Types } = require('mongoose');

const Thought = model('Thought', thoughtSchema);

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String, 
            required:[true, "reaction text is required"],
            maxLength: 300
        },
        username: {
            type: String,
            required: [true, "user name is required"]
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: date => date.toDateString()
        }
    },
    {
        toJSON: {
            getters: true
        }
    });

    const thoughtSchema = new Schema(
        {
            thoughtText: {
                type: String,
                required: [true, "thought text is required"],
                maxLength: 300
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: date => date.toDateString()
            },
            username: {
                type: String,
                required: [true, 'username is required']
            },
            userId: {
                type: Schema.Types.ObjectId,
                required: [true, 'user id is required']
            },
            reactions: [reactionSchema]
        },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
        });

// virtual reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


module.exports = Thought;