import { Assets } from "./asset";
import { CurrentTwitchClip } from "./generated/currentTwitchClip";
import { TwitchClipArray } from "./generated/twitchClipArray";
import { TwitchClipStateArray } from "./generated/twitchClipStateArray";
import { TwitchGameArray } from "./generated/twitchGameArray";
import { ImportCondition } from "./generated/importCondition";

type ReplicantMap = {
    'assets:background': Assets,
    'assets:logo': Assets,
    currentTwitchClip: CurrentTwitchClip,
    twitchClipArray: TwitchClipArray,
    twitchClipStateArray: TwitchClipStateArray,
    twitchGameArray: TwitchGameArray,
    importCondition: ImportCondition,
};

export {
    Assets,
    ReplicantMap
};
