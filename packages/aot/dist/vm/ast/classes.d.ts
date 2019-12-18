import { ClassDeclaration, ClassExpression, ExpressionWithTypeArguments, HeritageClause, ModifierFlags, PropertyDeclaration, SemicolonClassElement, SyntaxKind } from 'typescript';
import { ILogger } from '@aurelia/kernel';
import { Realm, ExecutionContext } from '../realm';
import { $FunctionEnvRec } from '../types/environment-record';
import { $String } from '../types/string';
import { $Undefined } from '../types/undefined';
import { $Function } from '../types/function';
import { $Any, $AnyNonEmpty } from '../types/_shared';
import { $Empty, empty } from '../types/empty';
import { $Error } from '../types/error';
import { I$Node, Context, $$ESDeclaration, $NodeWithStatements, $$PropertyName, $$AssignmentExpressionOrHigher, $$TSDeclaration, $$LHSExpressionOrHigher, $$ClassElement, $$MethodDefinition, $AnyParentNode, $$ESVarDeclaration } from './_shared';
import { ExportEntryRecord, $$ESModuleOrScript } from './modules';
import { $Identifier, $Decorator } from './expressions';
import { $InterfaceDeclaration } from './types';
import { $ConstructorDeclaration } from './functions';
import { $List } from '../types/list';
export declare type $$NodeWithHeritageClauses = ($ClassDeclaration | $ClassExpression | $InterfaceDeclaration);
export declare function $expressionWithTypeArgumentsList(nodes: readonly ExpressionWithTypeArguments[], parent: $HeritageClause, ctx: Context): readonly $ExpressionWithTypeArguments[];
export declare class $HeritageClause implements I$Node {
    readonly node: HeritageClause;
    readonly parent: $$NodeWithHeritageClauses;
    readonly ctx: Context;
    readonly idx: number;
    readonly mos: $$ESModuleOrScript;
    readonly realm: Realm;
    readonly depth: number;
    readonly logger: ILogger;
    readonly path: string;
    get $kind(): SyntaxKind.HeritageClause;
    readonly $types: readonly $ExpressionWithTypeArguments[];
    constructor(node: HeritageClause, parent: $$NodeWithHeritageClauses, ctx: Context, idx: number, mos?: $$ESModuleOrScript, realm?: Realm, depth?: number, logger?: ILogger, path?: string);
}
export declare class $ExpressionWithTypeArguments implements I$Node {
    readonly node: ExpressionWithTypeArguments;
    readonly parent: $HeritageClause;
    readonly ctx: Context;
    readonly idx: number;
    readonly mos: $$ESModuleOrScript;
    readonly realm: Realm;
    readonly depth: number;
    readonly logger: ILogger;
    readonly path: string;
    get $kind(): SyntaxKind.ExpressionWithTypeArguments;
    readonly $expression: $$LHSExpressionOrHigher;
    constructor(node: ExpressionWithTypeArguments, parent: $HeritageClause, ctx: Context, idx: number, mos?: $$ESModuleOrScript, realm?: Realm, depth?: number, logger?: ILogger, path?: string);
}
export declare class $ClassExpression implements I$Node {
    readonly node: ClassExpression;
    readonly parent: $AnyParentNode;
    readonly ctx: Context;
    readonly idx: number;
    readonly mos: $$ESModuleOrScript;
    readonly realm: Realm;
    readonly depth: number;
    readonly logger: ILogger;
    readonly path: string;
    get $kind(): SyntaxKind.ClassExpression;
    readonly modifierFlags: ModifierFlags;
    readonly $name: $Identifier | undefined;
    readonly $heritageClauses: readonly $HeritageClause[];
    readonly $members: readonly $$ClassElement[];
    readonly ClassHeritage: $HeritageClause | undefined;
    readonly BoundNames: readonly $String[];
    readonly ConstructorMethod: $ConstructorDeclaration | undefined;
    readonly HasName: boolean;
    readonly IsConstantDeclaration: false;
    readonly IsFunctionDefinition: true;
    readonly NonConstructorMethodDefinitions: $$MethodDefinition[];
    readonly PrototypePropertyNameList: readonly $String[];
    constructor(node: ClassExpression, parent: $AnyParentNode, ctx: Context, idx: number, mos?: $$ESModuleOrScript, realm?: Realm, depth?: number, logger?: ILogger, path?: string);
    EvaluateNamed(ctx: ExecutionContext, name: $String): $Function | $Error;
    Evaluate(ctx: ExecutionContext): $Function | $Error;
}
export declare class $ClassDeclaration implements I$Node {
    readonly node: ClassDeclaration;
    readonly parent: $NodeWithStatements;
    readonly ctx: Context;
    readonly idx: number;
    readonly mos: $$ESModuleOrScript;
    readonly realm: Realm;
    readonly depth: number;
    readonly logger: ILogger;
    readonly path: string;
    get $kind(): SyntaxKind.ClassDeclaration;
    readonly modifierFlags: ModifierFlags;
    readonly $decorators: readonly $Decorator[];
    readonly $name: $Identifier | $Undefined;
    readonly $heritageClauses: readonly $HeritageClause[];
    readonly $members: readonly $$ClassElement[];
    readonly ClassHeritage: $HeritageClause | undefined;
    readonly BoundNames: readonly $String[];
    readonly ConstructorMethod: $ConstructorDeclaration | undefined;
    readonly HasName: boolean;
    readonly IsConstantDeclaration: false;
    readonly IsFunctionDefinition: true;
    readonly NonConstructorMethodDefinitions: readonly $$MethodDefinition[];
    readonly PrototypePropertyNameList: readonly $String[];
    readonly VarDeclaredNames: readonly $String[];
    readonly VarScopedDeclarations: readonly $$ESVarDeclaration[];
    readonly ExportedBindings: readonly $String[];
    readonly ExportedNames: readonly $String[];
    readonly ExportEntries: readonly ExportEntryRecord[];
    readonly LexicallyDeclaredNames: readonly $String[];
    readonly LexicallyScopedDeclarations: readonly $$ESDeclaration[];
    readonly ModuleRequests: readonly $String[];
    readonly TypeDeclarations: readonly $$TSDeclaration[];
    readonly IsType: false;
    constructor(node: ClassDeclaration, parent: $NodeWithStatements, ctx: Context, idx: number, mos?: $$ESModuleOrScript, realm?: Realm, depth?: number, logger?: ILogger, path?: string);
    EvaluateClassDefinition(this: $ClassDeclaration | $ClassExpression, ctx: ExecutionContext, classBinding: $String | $Undefined, className: $String | $Undefined): $Function | $Error;
    EvaluateBindingClassDeclaration(ctx: ExecutionContext): $Function | $Error;
    Evaluate(ctx: ExecutionContext): $Empty | $Error;
    EvaluateBody(ctx: ExecutionContext<$FunctionEnvRec, $FunctionEnvRec>, functionObject: $Function, argumentsList: $List<$AnyNonEmpty>): $Any;
}
export declare class $PropertyDeclaration implements I$Node {
    readonly node: PropertyDeclaration;
    readonly parent: $ClassDeclaration | $ClassExpression;
    readonly ctx: Context;
    readonly idx: number;
    readonly mos: $$ESModuleOrScript;
    readonly realm: Realm;
    readonly depth: number;
    readonly logger: ILogger;
    readonly path: string;
    get $kind(): SyntaxKind.PropertyDeclaration;
    readonly modifierFlags: ModifierFlags;
    readonly $decorators: readonly $Decorator[];
    readonly $name: $$PropertyName;
    readonly $initializer: $$AssignmentExpressionOrHigher | undefined;
    readonly IsStatic: boolean;
    constructor(node: PropertyDeclaration, parent: $ClassDeclaration | $ClassExpression, ctx: Context, idx: number, mos?: $$ESModuleOrScript, realm?: Realm, depth?: number, logger?: ILogger, path?: string);
}
export declare class $SemicolonClassElement implements I$Node {
    readonly node: SemicolonClassElement;
    readonly parent: $ClassDeclaration | $ClassExpression;
    readonly ctx: Context;
    readonly idx: number;
    readonly mos: $$ESModuleOrScript;
    readonly realm: Realm;
    readonly depth: number;
    readonly logger: ILogger;
    readonly path: string;
    get $kind(): SyntaxKind.SemicolonClassElement;
    readonly IsStatic: false;
    readonly PropName: empty;
    constructor(node: SemicolonClassElement, parent: $ClassDeclaration | $ClassExpression, ctx: Context, idx: number, mos?: $$ESModuleOrScript, realm?: Realm, depth?: number, logger?: ILogger, path?: string);
}
//# sourceMappingURL=classes.d.ts.map