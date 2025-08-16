"use client";

import { Collapse } from "@mantine/core";
import ActionButtons from "./components/actionButtons";
import Toolbar from "./components/toolbar";
import { InputAction, InputState } from "./container";

interface CreatePostPresentationProps {
    onSubmit: (e: React.FormEvent) => void;
    inputState: InputState;
    dispatch: (action: InputAction) => void;
}

function Component({
    onSubmit,
    inputState,
    dispatch,
}: CreatePostPresentationProps) {
    return (
        <div className="create-post-wrapper bg-gray-100 p-2 rounded-2xl">
            <div className="bg-white border border-gray-200 rounded-2xl">
                <form onSubmit={onSubmit}>
                    <div className="p-2 border-b-0 border-gray-200">
                        <div className="toolbar-wrapper flex items-center justify-between mb-2 pb-2">
                            <Toolbar
                                dispatch={dispatch}
                                onDelete={() =>
                                    dispatch({ type: "RESET_INPUT" })
                                }
                                value={inputState.value}
                                emoji={inputState.emoji}
                            />
                        </div>
                    </div>

                    <Collapse in={!!inputState.error}>
                        <div className="text-red-500 text-sm p-2">
                            Error: {inputState.error}
                        </div>
                    </Collapse>

                    <ActionButtons onSubmit={onSubmit} />
                </form>
            </div>
        </div>
    );
}

export default Component;
