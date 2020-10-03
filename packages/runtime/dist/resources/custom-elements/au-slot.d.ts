import { IContainer } from '@aurelia/kernel';
import { INode, IRenderLocation } from '../../dom';
import { LifecycleFlags } from '../../flags';
import { ControllerVisitor, ICustomElementController, ICustomElementViewModel, IHydratedController, IHydratedParentController, ISyntheticView, IViewFactory } from '../../lifecycle';
import { IScope } from '../../observation';
import { CustomElementDefinition } from '../custom-element';
import { IHydrateElementInstruction, ITargetedInstruction } from '../../definitions';
export declare type IProjections = Record<string, CustomElementDefinition>;
export declare const IProjections: import("@aurelia/kernel").InterfaceSymbol<Record<string, CustomElementDefinition<import("@aurelia/kernel").Constructable<{}>, INode>>>;
export declare enum AuSlotContentType {
    Projection = 0,
    Fallback = 1
}
export declare class SlotInfo {
    readonly name: string;
    readonly type: AuSlotContentType;
    readonly projectionContext: ProjectionContext;
    constructor(name: string, type: AuSlotContentType, projectionContext: ProjectionContext);
}
export declare class ProjectionContext {
    readonly content: CustomElementDefinition;
    readonly scope: IScope | null;
    constructor(content: CustomElementDefinition, scope?: IScope | null);
}
export declare class RegisteredProjections {
    readonly scope: IScope;
    readonly projections: Record<string, CustomElementDefinition>;
    constructor(scope: IScope, projections: Record<string, CustomElementDefinition>);
}
export interface IProjectionProvider {
    registerProjections(projections: Map<ITargetedInstruction, IProjections>, scope: IScope): void;
    getProjectionFor(instruction: IHydrateElementInstruction): RegisteredProjections | null;
}
export declare const IProjectionProvider: import("@aurelia/kernel").InterfaceSymbol<IProjectionProvider>;
export declare class ProjectionProvider implements IProjectionProvider {
    static register(container: IContainer): IContainer;
    registerProjections(projections: Map<ITargetedInstruction, Record<string, CustomElementDefinition>>, scope: IScope): void;
    getProjectionFor(instruction: IHydrateElementInstruction): RegisteredProjections | null;
}
export declare class AuSlot<T extends INode = Node> implements ICustomElementViewModel<T> {
    private readonly factory;
    readonly view: ISyntheticView<T>;
    readonly $controller: ICustomElementController<T, this>;
    private readonly isProjection;
    private hostScope;
    private readonly outerScope;
    constructor(factory: IViewFactory<T>, location: IRenderLocation<T>);
    beforeBind(initiator: IHydratedController<T>, parent: IHydratedParentController<T>, flags: LifecycleFlags): void | Promise<void>;
    afterAttach(initiator: IHydratedController<T>, parent: IHydratedParentController<T>, flags: LifecycleFlags): void | Promise<void>;
    afterUnbind(initiator: IHydratedController<T>, parent: IHydratedParentController<T>, flags: LifecycleFlags): void | Promise<void>;
    onCancel(initiator: IHydratedController<T>, parent: IHydratedParentController<T>, flags: LifecycleFlags): void;
    dispose(): void;
    accept(visitor: ControllerVisitor<T>): void | true;
}
//# sourceMappingURL=au-slot.d.ts.map