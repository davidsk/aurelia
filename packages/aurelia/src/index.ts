import { DI, IContainer, Registration } from '@aurelia/kernel';
import { StandardConfiguration, Aurelia as $Aurelia, IPlatform, IAppRoot, CustomElementType, ISinglePageApp, CustomElement } from '@aurelia/runtime-html';
import { BrowserPlatform } from '@aurelia/platform-browser';

export const PLATFORM = BrowserPlatform.getOrCreate(globalThis);
export { IPlatform };

function createContainer(): IContainer {
  return DI.createContainer()
    .register(
      Registration.instance(IPlatform, PLATFORM),
      StandardConfiguration,
    );
}

export class Aurelia extends $Aurelia {
  public constructor(container: IContainer = createContainer()) {
    super(container);
  }

  public static start(root: IAppRoot | undefined): void | Promise<void> {
    return new Aurelia().start(root);
  }

  public static app(config: ISinglePageApp | unknown): Omit<Aurelia, 'register' | 'app' | 'enhance'> {
    return new Aurelia().app(config);
  }

  public static enhance(config: ISinglePageApp): Omit<Aurelia, 'register' | 'app' | 'enhance'> {
    return new Aurelia().enhance(config) as Omit<Aurelia, 'register' | 'app' | 'enhance'>;
  }

  public static register(...params: readonly unknown[]): Aurelia {
    return new Aurelia().register(...params);
  }

  public app(config: ISinglePageApp | unknown): Omit<this, 'register' | 'app' | 'enhance'> {
    if (CustomElement.isType(config as CustomElementType)) {
      // Default to custom element element name
      const definition = CustomElement.getDefinition(config as CustomElementType);
      let host = document.querySelector(definition.name);
      if (host === null) {
        // When no target is found, default to body.
        // For example, when user forgot to write <my-app></my-app> in html.
        host = document.body;
      }
      return super.app({
        host: host as HTMLElement,
        component: config as CustomElementType
      });
    }

    return super.app(config as ISinglePageApp);
  }
}

export default Aurelia;

export {
  Interceptor,
  // RetryConfiguration,
  // RetryableRequest,
  // ValidInterceptorMethodName,

  json,

  // retryStrategy,
  // RetryInterceptor,

  HttpClientConfiguration,

  HttpClient
} from '@aurelia/fetch-client';

export {
  all,
  DI,
  IContainer,
  // IDefaultableInterfaceSymbol,
  // IFactory,
  inject,
  IRegistration,
  IRegistry,
  IResolver,
  IServiceLocator,
  Key,
  lazy,
  optional,
  // RegisterSelf,
  Registration,
  // ResolveCallback,
  singleton,
  transient,
  // Injectable,
  // InterfaceSymbol,
  InstanceProvider,
  Resolved,
  // Transformer,

  Class,
  Constructable,
  ConstructableClass,
  // Diff,
  IDisposable,
  // IFrameRequestCallback,
  IIndexable,
  // IPerformance,
  // ITimerHandler,
  // IWindowOrWorkerGlobalScope,
  // KnownKeys,
  // NoInfer,
  // Omit,
  // OptionalKnownKeys,
  // OptionalValuesOf,
  // Overwrite,
  // Param0,
  // Param1,
  // Param2,
  // Param3,
  // Pick2,
  // Pick3,
  // Primitive,
  // Public,
  // Purify,
  // RequiredKnownKeys,
  // RequiredValuesOf,
  // StrictPrimitive,
  // Unwrap,
  // ValuesOf,
  // Writable,
  // IfEquals,
  // ReadonlyKeys,
  // WritableKeys,

  // metadata,
  Metadata,

  // IConsoleLike,
  ColorOptions,
  // ILogConfig,
  // ILogEvent,
  // ILogEventFactory,
  // ISink,
  ILogger,
  // LogConfig,
  // DefaultLogEvent,
  // DefaultLogEventFactory,
  // DefaultLogger,
  // ConsoleSink,
  LoggerConfiguration,

  // relativeToFile,
  // join,
  // parseQueryString,
  // IQueryParams,

  emptyArray,
  emptyObject,
  noop,

  // ITraceInfo,
  // ITraceWriter,
  // ILiveLoggingOptions,
  LogLevel,

  // IResourceDefinition,
  // IResourceDescriptions,
  // IResourceKind,
  // IResourceType,
  // ResourceDescription,
  // ResourcePartDescription,
  // fromAnnotationOrDefinitionOrTypeOrDefault,
  // fromAnnotationOrTypeOrDefault,
  // fromDefinitionOrDefault,

  EventAggregator,
  IEventAggregator,

  isArrayIndex,
  camelCase,
  kebabCase,
  pascalCase,
  toArray,
  // nextId,
  // resetId,
  // compareNumber,
  // mergeDistinct,
  // isNumberOrBigInt,
  // isStringOrDate,
  bound,
  // mergeArrays,
  // mergeObjects,
  // firstDefined,
  // getPrototypeChain,
} from '@aurelia/kernel';

export {
  // BrowserNavigator,

  // ILinkHandlerOptions,
  // AnchorEventInfo,

  // LinkHandler,

  // Guard,

  // GuardTypes,
  // GuardIdentity,
  // IGuardOptions,
  // Guardian,

  // InstructionResolver,

  // GuardFunction,
  // GuardTarget,
  // INavigatorInstruction,
  // IRouteableComponent,
  // IRouteableComponentType,
  // IViewportInstruction,
  // NavigationInstruction,
  // ReentryBehavior,

  // lifecycleLogger,
  // LifecycleClass,

  INavRoute,
  // Nav,

  NavRoute,

  // IStoredNavigatorEntry,
  // INavigatorEntry,
  // INavigatorOptions,
  // INavigatorFlags,
  // INavigatorState,
  // INavigatorStore,
  // INavigatorViewer,
  // INavigatorViewerEvent,
  // Navigator,

  // QueueItem,
  // IQueueOptions,
  // Queue,

  // RouteHandler,
  // ConfigurableRoute,
  // HandlerEntry,
  // RouteGenerator,
  // TypesRecord,
  // RecognizeResult,
  // RecognizeResults,
  // CharSpec,
  // // State as RouterState, // duplicated in @aurelia/runtime
  // StaticSegment,
  // DynamicSegment,
  // StarSegment,
  // EpsilonSegment,
  // Segment,
  // RouteRecognizer,

  RouterOptions,
  IRouterActivateOptions,
  IRouter,
  Router,

  // IViewportOptions,
  // Viewport,

  // ContentStatus,
  // ViewportContent,

  ViewportInstruction,

  RouterConfiguration,
  RouterRegistration,
  // DefaultComponents as RouterDefaultComponents,
  // DefaultResources as RouterDefaultResources,
  // ViewportCustomElement,
  // ViewportCustomElementRegistration,
  // NavCustomElement,
  // NavCustomElementRegistration,
  // GotoCustomAttribute,
  // GotoCustomAttributeRegistration
} from '@aurelia/router';

export {
  // CallFunctionExpression,
  // connects,
  // observes,
  // callsFunction,
  // hasAncestor,
  // isAssignable,
  // isLeftHandSide,
  // isPrimary,
  // isResource,
  // hasBind,
  // hasUnbind,
  // isLiteral,
  // arePureLiterals,
  // isPureLiteral,
  // CustomExpression,
  // BindingBehaviorExpression,
  // ValueConverterExpression,
  // AssignExpression,
  // ConditionalExpression,
  // AccessThisExpression,
  // AccessScopeExpression,
  // AccessMemberExpression,
  // AccessKeyedExpression,
  // CallScopeExpression,
  // CallMemberExpression,
  // BinaryExpression,
  // UnaryExpression,
  // PrimitiveLiteralExpression,
  // HtmlLiteralExpression,
  // ArrayLiteralExpression,
  // ObjectLiteralExpression,
  // TemplateExpression,
  // TaggedTemplateExpression,
  // ArrayBindingPattern,
  // ObjectBindingPattern,
  // BindingIdentifier,
  // ForOfStatement,
  // Interpolation,

  // AnyBindingExpression,
  // IsPrimary,
  // IsLiteral,
  // IsLeftHandSide,
  // IsUnary,
  // IsBinary,
  // IsConditional,
  // IsAssign,
  // IsValueConverter,
  // IsBindingBehavior,
  // IsAssignable,
  // IsExpression,
  // IsExpressionOrStatement,
  // Connects,
  // Observes,
  // CallsFunction,
  // IsResource,
  // HasBind,
  // HasUnbind,
  // HasAncestor,
  // IVisitor,
  // IExpression,
  // IAccessKeyedExpression,
  // IAccessMemberExpression,
  // IAccessScopeExpression,
  // IAccessThisExpression,
  // IArrayBindingPattern,
  // IArrayLiteralExpression,
  // IAssignExpression,
  // IBinaryExpression,
  // IBindingBehaviorExpression,
  // IBindingIdentifier,
  // ICallFunctionExpression,
  // ICallMemberExpression,
  // ICallScopeExpression,
  // IConditionalExpression,
  // ForOfStatement,
  // IHtmlLiteralExpression,
  // Interpolation,
  // IObjectBindingPattern,
  // IObjectLiteralExpression,
  // IPrimitiveLiteralExpression,
  // ITaggedTemplateExpression,
  // ITemplateExpression,
  // IUnaryExpression,
  // IValueConverterExpression,
  // BinaryOperator,
  // BindingIdentifierOrPattern,
  // UnaryOperator,

  // PropertyBinding,

  // CallBinding,

  // IPartialConnectableBinding,
  // IConnectableBinding,
  // connectable,

  // IExpressionParser,
  // BindingType,

  // MultiInterpolationBinding,
  // InterpolationBinding,

  // LetBinding,

  // RefBinding,

  // ArrayObserver,
  // enableArrayObservation,
  // disableArrayObservation,
  // applyMutationsToIndices,
  // synchronizeIndices,

  // MapObserver,
  // enableMapObservation,
  // disableMapObservation,

  // SetObserver,
  // enableSetObservation,
  // disableSetObservation,

  // BindingContext,
  // OverrideContext,

  // CollectionLengthObserver,

  // CollectionSizeObserver,

  // ComputedOverrides,
  // ComputedLookup,
  computed,
  // createComputedObserver,
  // CustomSetterObserver,
  // GetterObserver,

  // IDirtyChecker,
  // DirtyCheckProperty,
  // DirtyCheckSettings,

  // IObjectObservationAdapter,
  IObserverLocator,
  // ITargetObserverLocator,
  // ITargetAccessorLocator,
  // getCollectionObserver,
  // ObserverLocator,

  // PrimitiveObserver,

  // PropertyAccessor,

  // BindableObserver,

  // SetterObserver,

  ISignaler,

  subscriberCollection,
  collectionSubscriberCollection,

  bindingBehavior,
  BindingBehavior,
  BindingBehaviorInstance,
  // PartialBindingBehaviorDefinition,
  // BindingBehaviorKind,
  // BindingBehaviorDecorator,
  // BindingBehaviorInstance,
  // BindingBehaviorType,

  // BindingModeBehavior,
  // OneTimeBindingBehavior,
  // ToViewBindingBehavior,
  // FromViewBindingBehavior,
  // TwoWayBindingBehavior,

  // DebounceBindingBehavior,

  // SignalableBinding,
  // SignalBindingBehavior,

  // ThrottleBindingBehavior,

  customAttribute,
  // CustomAttributeDecorator,
  CustomAttribute,
  // CustomAttributeDefinition
  // CustomAttributeKind,
  // CustomAttributeType,
  // PartialCustomAttributeDefinition,
  templateController,

  // FrequentMutations,
  // InfrequentMutations,
  // ObserveShallow,

  // If,
  // Else,

  // Repeat,

  // Replaceable,

  // With,

  containerless,
  customElement,
  CustomElement,
  // CustomElementDecorator,
  // CustomElementKind,
  // CustomElementType,
  // CustomElementDefinition,
  // PartialCustomElementDefinition,
  // IElementProjector,
  // IProjectorLocator,
  useShadowDOM,

  ValueConverter,
  // ValueConverterDefinition,
  // PartialValueConverterDefinition,
  // ValueConverterKind,
  // ValueConverterDecorator,
  ValueConverterInstance,
  // ValueConverterType,
  valueConverter,

  // ISanitizer,
  // SanitizeValueConverter,

  // ViewValueConverter,

  // Clock,
  // IClock,
  // IClockSettings,
  // ITask,
  // TaskQueue,
  // QueueTaskOptions,
  // Task,
  // TaskAbortError,
  // TaskCallback,
  // TaskQueue,
  TaskQueuePriority,
  // TaskStatus,
  // QueueTaskTargetOptions,

  bindable,
  // PartialBindableDefinition,
  // BindableDefinition,
  Bindable,

  // PartialChildrenDefinition,
  // ChildrenDefinition,
  // Children,
  children,

  // These exports are temporary until we have a proper way to unit test them
  Controller,

  ViewFactory,
  // IViewLocator,
  // ViewLocator,
  // view,
  // Views,

  // Aurelia, // Replaced by quick-start wrapper
  // IDOMInitializer,
  // ISinglePageApp,
  IAppRoot,

  // IfRegistration,
  // ElseRegistration,
  // RepeatRegistration,
  // ReplaceableRegistration,
  // WithRegistration,

  // SanitizeValueConverterRegistration,

  // DebounceBindingBehaviorRegistration,
  // OneTimeBindingBehaviorRegistration,
  // ToViewBindingBehaviorRegistration,
  // FromViewBindingBehaviorRegistration,
  // SignalBindingBehaviorRegistration,
  // ThrottleBindingBehaviorRegistration,
  // TwoWayBindingBehaviorRegistration,

  // RefBindingRendererRegistration,
  // CallBindingRendererRegistration,
  // CustomAttributeRendererRegistration,
  // CustomElementRendererRegistration,
  // InterpolationBindingRendererRegistration,
  // IteratorBindingRendererRegistration,
  // LetElementRendererRegistration,
  // PropertyBindingRendererRegistration,
  // SetPropertyRendererRegistration,
  // TemplateControllerRendererRegistration,

  // DefaultResources as RuntimeDefaultResources,
  // IObserverLocatorRegistration,
  // ILifecycleRegistration,
  // IRendererRegistration,
  // RuntimeConfiguration,

  // AttributeInstruction,
  // ICallBindingInstruction,
  // IHydrateAttributeInstruction,
  // IHydrateElementInstruction,
  // IHydrateLetElementInstruction,
  // IHydrateTemplateController,
  // IInterpolationInstruction,
  // IIteratorBindingInstruction,
  // ILetBindingInstruction,
  // IInstructionRow,
  // InstructionTypeName,
  // IPropertyBindingInstruction,
  // IRefBindingInstruction,
  // ISetPropertyInstruction,
  // isInstruction,
  // IInstruction,
  // NodeInstruction,
  // IInstruction,
  // InstructionType,
  // PartialCustomElementDefinitionParts,
  alias,
  registerAliases,

  // DOM, should expose the one exported in runtime-html
  INode,
  IEventTarget,
  IRenderLocation,
  // NodeSequence,
  // INodeSequence,
  // INodeSequenceFactory,

  BindingMode,
  // ExpressionKind,
  // Hooks,
  LifecycleFlags,
  // State,

  // CallBindingInstruction,
  // HydrateAttributeInstruction,
  // HydrateElementInstruction,
  // HydrateTemplateController,
  // InterpolationInstruction,
  // IteratorBindingInstruction,
  // LetBindingInstruction,
  // HydrateLetElementInstruction,
  // RefBindingInstruction,
  // SetPropertyInstruction,

  // ViewModelKind,
  // IBinding,
  ILifecycle,
  IViewModel,
  // IController,
  // IContainer,
  // IViewCache,
  // IViewFactory,
  // MountStrategy,

  // AccessorOrObserver,
  // Collection,
  // CollectionKind,
  // DelegationStrategy,
  // IAccessor,
  // IBindingContext,
  // IBindingTargetAccessor,
  // IBindingTargetObserver,
  // ICollectionChangeTracker,
  // ICollectionObserver,
  // ICollectionSubscriber,
  IndexMap,
  // IObservable,
  // IObservedArray,
  // IObservedMap,
  // IObservedSet,
  // IOverrideContext,
  // IPropertyChangeTracker,
  // IPropertyObserver,
  // Scope,
  // ISubscribable,
  // ISubscriberCollection,
  // ObservedCollection,
  // PropertyObserver,
  // CollectionObserver,
  // ICollectionSubscriberCollection,
  // ICollectionSubscribable,
  // ISubscriber,
  // isIndexMap,
  // copyIndexMap,
  // cloneIndexMap,
  // createIndexMap,

  renderer,

  // DefaultBindingLanguage as JitDefaultBindingLanguage,

  // JitConfiguration,

  // Access,
  // Precedence,
  // Char,
  // These exports are temporary until we have a proper way to unit test them

  // parseExpression,
  // parse,
  // ParserState,

  // BindableInfo,
  // ElementInfo,
  // AttrInfo,

  // AnySymbol,
  // BindingSymbol,
  // CustomAttributeSymbol,
  // CustomElementSymbol,
  // ElementSymbol,
  // LetElementSymbol,
  // NodeSymbol,
  // ParentNodeSymbol,
  // PlainAttributeSymbol,
  // PlainElementSymbol,
  // ReplacePartSymbol,
  // ResourceAttributeSymbol,
  // SymbolFlags,
  // SymbolWithBindings,
  // SymbolWithMarker,
  // SymbolWithTemplate,
  // TemplateControllerSymbol,
  // TextSymbol

  IAurelia,
  // Listener,

  // AttributeBinding,

  // AttributeNSAccessor,

  // IInputElement,
  // CheckedObserver,

  // ClassAttributeAccessor,

  // DataAttributeAccessor,

  // ElementPropertyAccessor,

  // IManagedEvent,
  // ListenerTracker,
  // DelegateOrCaptureSubscription,
  // TriggerSubscription,
  // IElementConfiguration,
  // IEventDelegator,
  // IEventSubscriber,
  // IEventTargetWithLookups,
  // EventSubscriber,
  // EventSubscription,
  // EventDelegator,

  // TargetAccessorLocator,
  // TargetObserverLocator,

  // ISelectElement,
  // IOptionElement,
  // SelectValueObserver,

  // StyleAttributeAccessor,

  // ISVGAnalyzer,

  // ValueAttributeObserver,

  // AttrBindingBehavior,

  // SelfableBinding,
  // SelfBindingBehavior,

  // UpdateTriggerBindingBehavior,
  // UpdateTriggerableBinding,
  // UpdateTriggerableObserver,

  // Blur,
  // BlurManager,

  // Focus,

  // Portal,
  // PortalTarget,
  // PortalLifecycleCallback,

  // Subject,
  // Compose,

  // IProjectorLocatorRegistration,
  // ITargetAccessorLocatorRegistration,
  // ITargetObserverLocatorRegistration,
  // ITemplateFactoryRegistration,

  // DefaultComponents as RuntimeHtmlDefaultComponents,

  // CompiledTemplate,
  // ChildrenObserver,
  // IRenderer,
  // IInstructionTypeClassifier,
  // IRenderingEngine,
  // ITemplate,
  // ITemplateCompiler,
  // ITemplateFactory,

  // RenderContext

  // AttrSyntax,

  // IAttributeParser,

  attributePattern,
  // AttributePatternDefinition,
  IAttributePattern,
  // IAttributePatternHandler,
  // Interpretation,
  // ISyntaxInterpreter,

  // AtPrefixedTriggerAttributePattern,
  // ColonPrefixedBindAttributePattern,
  // DotSeparatedAttributePattern,
  // RefAttributePattern,

  bindingCommand,
  // BindingCommand,
  BindingCommandInstance,
  // BindingCommandDefinition,
  // BindingCommandKind,
  // BindingCommandType,
  getTarget,

  // CallBindingCommand,
  // DefaultBindingCommand,
  // ForBindingCommand,
  // FromViewBindingCommand,
  // OneTimeBindingCommand,
  // ToViewBindingCommand,
  // TwoWayBindingCommand,

  // IExpressionParserRegistration,

  // DefaultComponents as JitDefaultComponents,

  // RefAttributePatternRegistration,
  // DotSeparatedAttributePatternRegistration,

  // DefaultBindingSyntax,

  // AtPrefixedTriggerAttributePatternRegistration,
  // ColonPrefixedBindAttributePatternRegistration,

  ShortHandBindingSyntax,

  // CallBindingCommandRegistration,
  // DefaultBindingCommandRegistration,
  // ForBindingCommandRegistration,
  // FromViewBindingCommandRegistration,
  // OneTimeBindingCommandRegistration,
  // ToViewBindingCommandRegistration,
  // TwoWayBindingCommandRegistration,

  // AttrBindingBehaviorRegistration,
  // SelfBindingBehaviorRegistration,
  // UpdateTriggerBindingBehaviorRegistration,
  // ComposeRegistration,

  // DefaultResources as RuntimeHtmlDefaultResources,

  // AttributeBindingRendererRegistration,
  // ListenerBindingRendererRegistration,
  // SetAttributeRendererRegistration,
  // SetClassAttributeRendererRegistration,
  // SetStyleAttributeRendererRegistration,
  // StylePropertyBindingRendererRegistration,
  // TextBindingRendererRegistration,

  // DefaultRenderers,

  // StandardConfiguration,

  createElement,
  // RenderPlan,

  // AttributeInstruction,
  // IInstructionRow,
  // NodeInstruction,
  // IInstruction,
  // InstructionType,
  // IAttributeBindingInstruction,
  // IListenerBindingInstruction,
  // ISetAttributeInstruction,
  // isInstruction,
  // IStylePropertyBindingInstruction,
  // ITextBindingInstruction,

  // NodeSequenceFactory,
  // FragmentNodeSequence,

  // AttributeBindingInstruction,
  // SetAttributeInstruction,
  // SetClassAttributeInstruction,
  // SetStyleAttributeInstruction,
  // StylePropertyBindingInstruction,
  // TextBindingInstruction,

  // ContainerlessProjector,
  // HostProjector,
  // HTMLProjectorLocator,
  // ShadowDOMProjector,

  StyleConfiguration,
  // styles,
  IShadowDOMConfiguration,

  // CSSModulesProcessorRegistry,
  cssModules,

  // ShadowDOMRegistry,
  // IShadowDOMStyleFactory,
  shadowCSS,

  // AdoptedStyleSheetsStyles,
  // StyleElementStyles,
  // IShadowDOMStyles,
  // IShadowDOMGlobalStyles

  // IAttrSyntaxTransformer,

  // TriggerBindingCommand,
  // DelegateBindingCommand,
  // CaptureBindingCommand,
  // AttrBindingCommand,
  // ClassBindingCommand,
  // StyleBindingCommand,

  // ITemplateCompilerRegistration,
  // ITemplateElementFactoryRegistration,
  // IAttrSyntaxTransformerRegistation,

  // DefaultComponents as JitHtmlDefaultComponents,

  // TriggerBindingCommandRegistration,
  // DelegateBindingCommandRegistration,
  // CaptureBindingCommandRegistration,
  // AttrBindingCommandRegistration,
  // ClassBindingCommandRegistration,
  // StyleBindingCommandRegistration,

  // DefaultBindingLanguage as JitHtmlDefaultBindingLanguage,

  // StandardConfiguration,

  // stringifyDOM,
  // stringifyInstructions,
  // stringifyTemplateDefinition,

  // TemplateBinder,

  // ITemplateElementFactory
} from '@aurelia/runtime-html';

