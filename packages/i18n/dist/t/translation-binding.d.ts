import { IServiceLocator, IContainer } from '@aurelia/kernel';
import { ICallBindingInstruction, IConnectableBinding, IExpressionParser, IObserverLocator, IPartialConnectableBinding, IScope, IsExpression, LifecycleFlags, INode, IRenderableController } from '@aurelia/runtime';
import i18next from 'i18next';
interface TranslationBindingCreationContext {
    parser: IExpressionParser;
    observerLocator: IObserverLocator;
    context: IContainer;
    controller: IRenderableController;
    target: HTMLElement;
    instruction: ICallBindingInstruction;
    isParameterContext?: boolean;
}
export interface TranslationBinding extends IConnectableBinding {
}
export declare class TranslationBinding implements IPartialConnectableBinding {
    observerLocator: IObserverLocator;
    locator: IServiceLocator;
    interceptor: this;
    id: number;
    isBound: boolean;
    expr: IsExpression;
    parametersExpr?: IsExpression;
    private readonly i18n;
    private readonly contentAttributes;
    private keyExpression;
    private translationParameters;
    private scope;
    private hostScope;
    private isInterpolatedSourceExpr;
    private readonly targetObservers;
    target: HTMLElement;
    constructor(target: INode, observerLocator: IObserverLocator, locator: IServiceLocator);
    static create({ parser, observerLocator, context, controller, target, instruction, isParameterContext, }: TranslationBindingCreationContext): void;
    private static getBinding;
    $bind(flags: LifecycleFlags, scope: IScope, hostScope: IScope | null): void;
    $unbind(flags: LifecycleFlags): void;
    handleChange(newValue: string | i18next.TOptions, _previousValue: string | i18next.TOptions, flags: LifecycleFlags): void;
    private handleLocaleChange;
    private updateTranslations;
    private updateAttribute;
    private preprocessAttributes;
    private isContentAttribute;
    private updateContent;
    private prepareTemplate;
    private addContentToTemplate;
    private unobserveTargets;
    private ensureKeyExpression;
    dispose(): void;
}
export {};
//# sourceMappingURL=translation-binding.d.ts.map