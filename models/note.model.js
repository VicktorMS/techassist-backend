import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-sequence';

const AutoIncrementPlugin = AutoIncrement(mongoose);

const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

noteSchema.plugin(AutoIncrementPlugin, { 
    inc_field: 'ticket',
    id: 'ticket_seq',
    start_seq: 500
});

export default mongoose.model('Note', noteSchema)