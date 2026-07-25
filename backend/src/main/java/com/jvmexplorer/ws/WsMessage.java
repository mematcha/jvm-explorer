package com.jvmexplorer.ws;

public record WsMessage(
        String type,
        Object payload) {
}
