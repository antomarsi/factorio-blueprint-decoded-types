
export type Icon = {
    index: number,
    signal: SignalID
}

export type SignalID = {
    name: string,
    type: SignalIDType
}

export enum TypeInput {
    INPUT = "input",
    OUTPUT = "output"
}

export type BlueprintType = Blueprint | BlueprintBook | DeconstructionPlanner | UpgradePlanner

export interface BlueprintBook {
    blueprint_book: {
        item: string,
        label: string,
        label_color?: { r: number, g: number, b: number, a: number },
        blueprints?: Array<BlueprintType>
        active_index?: number,
        icons: Icon[]
        description?: string
        version: number
    }
}

export interface Blueprint {
    blueprint: {
        item: string,
        label: string,
        label_color?: Color,
        entities: Entity[],
        tiles: Tiles[],
        icons: Icon[],
        schedules: Schedules[],
        description?: string,
        version: number,
    }
}

export interface UpgradePlanner {
    upgrade_planner: {
        settings: UpgradePlannerSettings,
        label?: string
        item: string,
        version: number
    }
}

export interface DeconstructionPlanner {
    deconstruction_planner: {
        settings: DeconstructionPlannerSettings,
        item: string,
        version: number
    }
}

export enum EntityFilterMode {
    WHITELIST = 0,
    BLACKLIST = 1
}


export type DeconstructionPlannerEntityFilter = {
    name: string
    quality?: string,
    comparator: string,
    index: number
}

export type DeconstructionPlannerSettings = {
    entity_filters?: DeconstructionPlannerEntityFilter[],
    trees_and_rocks_only?: boolean,
    entity_filter_mode?: number,
    tile_selection_mode?: number,

}

export type UpgradePlannerMapper = {
    to: {
        type: SignalIDType,
        name: string,
        quality?: string,
        module_limit?: number,
        module_slots?: ModuleSlot[]
    }
}

export type ModuleSlot = {
    name: string,
    quality?: string
}

export type UpgradePlannerSettings = {
    trees_and_rocks_only?: boolean,
    mapper: any[],
}



export enum InputOutputPriority {
    RIGHT = "right",
    LEFT = "left",
    NONE = "none"
}

export enum FilterMode {
    WHITELIST = "whitelist",
    BLACKLIST = "blacklist"
}

export type ItemRequest = Record<string, number>

export type InfinitySettings = {
    remove_unfiltered_items: boolean,
    filters?: InfinityFilter[]
}

export type InfinityFilter = {
    name: string,
    count: number,
    mode: "at-least" | "at-most" | "exactly",
    index: number
}

export type LogisticFilter = {
    name: string,
    index: number,
    count: number
}

export type Entity = {
    entity_number: number,
    name: string
    position: Position,
    direction?: number,
    orientation?: number,
    connections?: Connection,
    neighbours?: number[],
    control_behavior?: ControlBehavior,
    items?: ItemRequest,
    recipe?: string,
    bar?: number,
    ammo_inventory?: Inventory,
    trunk_inventory?: Inventory,
    inventory?: Inventory,
    infinity_settings?: InfinitySettings,
    type?: TypeInput,
    input_priority?: InputOutputPriority,
    output_priority?: InputOutputPriority,
    filter?: string,
    filters?: ItemFilter[],
    filter_mode?: FilterMode,
    override_stack_size?: number,
    drop_position?: Position,
    pickup_position?: Position,
    request_filters?: LogisticFilter,
    request_from_buffers?: boolean,
    parameters?: SpeakerParameter,
    alert_parameters?: SpeakerAlertParameter,
    auto_launch?: boolean,
    variation?: number,
    color?: Color,
    station?: string,
    manual_trains_limit?: number,
    switch_state?: boolean,
    tags?: Record<string, any>
}

export type ControlBehavior = {
    logistic_condition?: CircuitCondition,
    connect_to_logistic_network?: boolean,
    circuit_close_signal?: boolean,
    circuit_read_signal?: boolean,
    red_output_signal?: SignalID,
    orange_output_signal?: SignalID,
    green_output_signal?: SignalID,
    blue_output_signal?: SignalID,
    circuit_condition?: CircuitCondition,
    circuit_enable_disable?: boolean,
    send_to_train?: boolean,
    read_from_train?: boolean,
    read_stopped_train?: boolean,
    train_stopped_signal?: SignalID,
    set_trains_limit?: boolean,
    trains_limit_signal?: SignalID,
    read_trains_count?: boolean,
    trains_count_signal?: SignalID,
    read_logistics?: boolean,
    read_robot_stats?: boolean,
    available_logistic_output_signal?: SignalID,
    total_logistic_output_signal?: SignalID,
    available_construction_output_signal?: SignalID,
    total_construction_output_signal?: SignalID,
    circuit_open_gate?: boolean,
    circuit_read_sensor?: boolean,
    output_signal?: SignalID,
    circuit_read_hand_contents?: boolean,
    circuit_contents_read_mode?: number,
    circuit_mode_of_operation?: number,
    circuit_hand_read_mode?: number,
    circuit_set_stack_size?: boolean,
    stack_control_input_signal?: SignalID,
    circuit_read_resources?: boolean,
    circuit_resource_read_mode?: number,
    is_on?: boolean,
    filters?: LogisticSections[],
    arithmetic_conditions?: ArithmeticCombinatorParameters,
    decider_conditions?: DeciderCombinatorParameters,
    circuit_parameters?: ProgrammableSpeakerCircuitParameters,
    use_colors?: boolean
}

export type ProgrammableSpeakerCircuitParameters = {
    signal_value_is_pitch: boolean,
    instrument_id: number
    note_id: number
}

export type DeciderCombinatorParameters = {
    conditions: any[]
    outputs: any[]
}

export type Operation = "*" | "/" | "+" | "-" | "%" | "^" | "<<" | ">>" | "AND" | "|" | "XOR"

export type ArithmeticCombinatorParameters = {
    first_signal?: SignalID,
    second_signal?: SignalID,
    first_constant?: number,
    second_constant?: number,
    operation?: Operation,
    output_signal?: SignalID
}

export type LogisticSections = {
    sections: LogisticSection[],
    trash_not_requested?: boolean
}

export type SignalIDType = "item" | "fluid" | "virtual" | "entity" | "recipe" | "space-location" | "asteroid-chunk" | "quality"

export type LogisticSection = {
    index: number,
    filters?: BlueprintLogisticFilter[]
    group?: string,
    multiplier?: number,
    active?: boolean
}


export type BlueprintLogisticFilter = {
    index: number,
    type?: SignalIDType,
    name?: string,
    quality?: string,
    comparator?: string,
    count: number,
    max_count?: number
    minimum_delivery_count?: number,
    import_from?: string
}

export type SpeakerParameter = {
    playback_volume: number,
    playback_globally: boolean,
    allow_polyphony: boolean
}

export type SpeakerAlertParameter = {
    show_alert: boolean,
    show_on_map: boolean,
    icon_signal_id: SignalID,
    alert_message: string
}


export type Inventory = {
    filters: ItemFilter[],
    bar?: number
}

export type ItemFilter = {
    name: string,
    index: number
}

export type Position = {
    x: number,
    y: number
}

export type Connection = {

}

export type Tiles = {
    name: string
    position: Position
}

export type Color = {
    r: number,
    g: number,
    b: number,
    a: number
}

enum WaitConditionType {
    INACTIVITY = "inactivity",
    FULL = "full",
    EMPTY = "empty",
    ITEM_COUNT = "item_count",
    CIRCUIT = "circuit",
    ROBOTS_INACTIVE = "robots_inactive",
    FLUID_COUNT = "fluid_count",
    PASSENGER_PRESENT = "passenger_present",
    PASSENGER_NOT_PRESENT = "passenger_not_present"
}

enum CompareType {
    AND = "and",
    OR = "or"
}

export type CircuitCondition = {

}

export type WaitCondition = {
    type: WaitConditionType,
    compare_type: CompareType,
    ticks?: number
    condition?: CircuitCondition
}


export type Schedule = {
    station: string,
    wait_conditions: WaitCondition[]
}

export type Schedules = {
    schedule: Schedule[]
}

