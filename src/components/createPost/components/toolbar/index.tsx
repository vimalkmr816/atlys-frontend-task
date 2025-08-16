"use client";

import { Link, RichTextEditor } from "@mantine/tiptap";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import { useEffect, useState } from "react";

import { Button, Popover, Text } from "@mantine/core";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-subscript";
import StarterKit from "@tiptap/starter-kit";
import { Smile, Trash2 } from "lucide-react";
import { InputAction } from "../../container";
import { EMOJI_LIST } from "@/src/constants/content";

interface ToolbarProps {
    onDelete: () => void;
    dispatch: (action: InputAction) => void;
    value: string;
    emoji: string;
}

export default function Toolbar({
    onDelete,
    dispatch,
    value,
    emoji,
}: ToolbarProps) {
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string>(emoji);

    // Update selectedEmoji when emoji prop changes
    useEffect(() => {
        setSelectedEmoji(emoji);
    }, [emoji]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({
                placeholder: "How are you feeling today?",
            }),
        ],
        onUpdate: ({ editor }) => {
            dispatch({ type: "SET_INPUT", payload: editor.getHTML() });
        },
        immediatelyRender: false,
        content: value,
    });

    // Update editor content when value prop changes
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
            dispatch({ type: "SET_INPUT", payload: value });
        }
    }, [editor, value, dispatch]);

    const selectEmoji = (emoji: string) => {
        setSelectedEmoji(emoji);
        dispatch({ type: "SET_EMOJI", payload: emoji });
        setEmojiPickerOpen(false);
    };

    const removeEmoji = () => {
        setSelectedEmoji("");
        dispatch({ type: "SET_EMOJI", payload: "" });
    };

    return (
        <div className="tooolbar flex items-center justify-between w-full">
            <div className="flex items-center space-x-4 w-full">
                <RichTextEditor
                    editor={editor}
                    classNames={{
                        root: "w-full border-0 !border-0 flex items-center flex-col",
                        content: "border-0 !border-0",
                        toolbar:
                            "border-0 !border-0  w-fit !rounded-lg p-2 shadow-none !bg-gray-100",
                        control:
                            "border-0 !border-0  first:rounded-l-lg last:rounded-r-lg !bg-transparent  data-active:!bg-white data-active:!shadow-sm !text-gray-700 hover:!text-gray-600",
                        controlsGroup:
                            "border-0 !border-0 rounded-lg !p-0 border-r-2 !border-red-500 gap-2 !bg-gray-100",
                    }}
                    variant={"subtle"}
                >
                    <div className="flex items-center justify-between w-full">
                        <RichTextEditor.Toolbar
                            sticky
                            stickyOffset={0}
                            className="border-0 !border-0"
                            style={{ border: "none" }}
                        >
                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1
                                    data-active
                                    icon={() => (
                                        <div className="flex items-center justify-center px-2 ">
                                            Paragraph
                                        </div>
                                    )}
                                />
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                            </RichTextEditor.ControlsGroup>
                            <div className="h-6 w-px bg-gray-400 mx-2" />

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                            </RichTextEditor.ControlsGroup>
                            <div className="h-6 w-px bg-gray-400 mx-2" />

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Blockquote />
                                <RichTextEditor.CodeBlock />
                            </RichTextEditor.ControlsGroup>
                        </RichTextEditor.Toolbar>
                        <button
                            type="button"
                            onClick={onDelete}
                            className="text-red-500 hover:text-red-600 p-1 rounded-lg hover:bg-red-100 transition-colors bg-red-50 p-3"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>

                    <div className="flex justify-between w-full items-start gap-1">
                        <SelectEmoji
                            selectedEmoji={selectedEmoji}
                            removeEmoji={removeEmoji}
                            emojiPickerOpen={emojiPickerOpen}
                            setEmojiPickerOpen={setEmojiPickerOpen}
                            selectEmoji={selectEmoji}
                        />

                        {/* Text Editor Content */}
                        <RichTextEditor.Content
                            className="border-0 !border-0 flex-1 w-full p-0"
                            style={{
                                border: "none",
                                minHeight: "4.5rem",
                                lineHeight: "1",
                            }}
                        />
                    </div>
                </RichTextEditor>
            </div>
        </div>
    );
}

function SelectEmoji({
    selectedEmoji,
    removeEmoji,
    emojiPickerOpen,
    setEmojiPickerOpen,
    selectEmoji,
}: {
    selectedEmoji: string;
    removeEmoji: () => void;
    emojiPickerOpen: boolean;
    setEmojiPickerOpen: (open: boolean) => void;
    selectEmoji: (emoji: string) => void;
}) {
    return (
        <div className="flex items-center gap-1 m-2">
            {selectedEmoji ? (
                <div className="flex items-center">
                    <span className="text-2xl">{selectedEmoji}</span>
                    <button
                        onClick={removeEmoji}
                        className="text-gray-400 hover:text-gray-600 text-sm hover:bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                        title="Remove emoji"
                    >
                        ×
                    </button>
                </div>
            ) : (
                <Popover
                    opened={emojiPickerOpen}
                    onChange={setEmojiPickerOpen}
                    position="bottom"
                    withArrow
                    shadow="md"
                    classNames={{
                        dropdown: "p-1",
                    }}
                    radius="lg"
                >
                    <Popover.Target>
                        <button
                            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                            className="!bg-transparent hover:!bg-gray-200 !text-gray-700 p-2 rounded-lg"
                        >
                            <Smile size={24} />
                        </button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <div className="p-2">
                            <Text
                                size="sm"
                                fw={500}
                                mb="xs"
                            >
                                Choose an emoji
                            </Text>
                            <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
                                {EMOJI_LIST.map((emoji, index) => (
                                    <button
                                        key={index}
                                        onClick={() => selectEmoji(emoji)}
                                        className="w-8 h-8 text-lg hover:bg-gray-100 rounded transition-colors flex items-center justify-center !text-xl"
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Popover.Dropdown>
                </Popover>
            )}
        </div>
    );
}
