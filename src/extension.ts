// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

let timeout: NodeJS.Timeout;

function restart() {
	// Clear any existing timeout to prevent multiple restarts
	if (timeout) {
		clearTimeout(timeout);
	}

	// Schedule a new restart
	timeout = setTimeout(() => {
		if (vscode.debug.activeDebugSession) {
			vscode.commands.executeCommand("workbench.action.debug.restart");
		}
	}, 250);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.workspace.onDidSaveTextDocument((doc) => {
		// if it's a Go file, restart the debugger.
		if (doc.fileName.endsWith(".go") && !doc.fileName.endsWith("_test.go")) {
			restart();
		}
	});
}

// This method is called when your extension is deactivated
export function deactivate() {
	clearTimeout(timeout);
}
